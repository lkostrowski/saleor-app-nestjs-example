import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { OrderToExportFragment, OrdersPageDocument } from 'generated/graphql';
import { createGraphQLClient } from 'src/graphql/graphql-client';

type Payload = { saleorApiUrl: string; token: string };

type OrderCsvData = {
  orderId: string;
};
type LineCsvData = {
  orderId: string;
};

@Processor('orders-export')
@Injectable()
export class OrdersExportService {
  constructor(@InjectQueue('orders-export') private ordersQueue: Queue) {}

  // todo: scope by channel
  @Process('export-orders')
  async transcode(job: Job<Payload>) {
    const result = await this.fetchAll(job.data);

    const csvModel = this.createCsvModel(result);

    console.log(csvModel);
    // todo generate file

    job.moveToCompleted();
  }

  private createCsvModel(
    orders: OrderToExportFragment[],
  ): Array<OrderCsvData | LineCsvData> {
    return orders.flatMap((order) => {
      const orderRow: OrderCsvData = {
        orderId: order.id,
      };

      const lines: LineCsvData[] = order.lines.map((line) => ({
        orderId: order.id,
        variantId: line.productVariantId,
        variantName: line.variantName,
        quantity: line.quantity,
        sku: line.productSku,
      }));

      return [orderRow, ...lines];
    });
  }

  private async fetchAll(payload: Payload) {
    const gqlClient = createGraphQLClient(payload);
    const orders: OrderToExportFragment[] = [];

    let cursor: string | undefined = undefined;
    let hasNextPage = true;

    while (hasNextPage) {
      Logger.log(`Fetching orders with cursor ${cursor}`);
      const result = await gqlClient
        .query(OrdersPageDocument, {
          cursor: cursor,
        })
        .toPromise()
        .catch((e) => {
          Logger.error(e);

          throw e;
        });

      cursor = result.data.orders.pageInfo.endCursor;
      hasNextPage = result.data.orders.pageInfo.hasNextPage;

      orders.push(...result.data.orders.edges.map((e) => e.node));
    }

    return orders;
  }
}
