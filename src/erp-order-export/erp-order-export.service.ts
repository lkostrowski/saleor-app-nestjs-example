import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { OrderCreatedEventFragment } from 'generated/graphql';

const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

@Processor('orders-export')
@Injectable()
export class ErpOrderExportService {
  constructor(@InjectQueue('orders-export') private ordersQueue: Queue) {}

  @Process('send-order-to-erp')
  async transcode(job: Job<OrderCreatedEventFragment>) {
    console.log(job.data);
    console.log(`receive job with order ID: ${job.data.order.id}`);

    await wait();

    await job.moveToCompleted();
  }

  async getLastJobs() {
    const jobs = await this.ordersQueue.getJobs(['completed']);

    return jobs.map((j) => ({
      id: j.id,
      orderId: j.data?.order?.id,
    }));
  }
}
