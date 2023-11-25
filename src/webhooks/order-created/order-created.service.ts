import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { WebhookManifest } from '@saleor/app-sdk/types';
import {
  OrderCreatedDocument,
  OrderCreatedEventFragment,
} from 'generated/graphql';
import { Queue } from 'bull';

interface HasManifestSubscription {
  getWebhookManifest(baseUrl: string): WebhookManifest;
}

import { ASTNode, print } from 'graphql';

export const gqlAstToString = (ast: ASTNode) =>
  print(ast) // convert AST to string
    .replaceAll(/\n*/g, '') // remove new lines
    .replaceAll(/\s{2,}/g, ' ') // remove unnecessary multiple spaces
    .trim(); // remove whitespace from beginning and end

@Injectable()
export class OrderCreatedService implements HasManifestSubscription {
  constructor(@InjectQueue('orders-export') private ordersQueue: Queue) {}

  async processWebhook(payload: OrderCreatedEventFragment) {
    const job = await this.ordersQueue.add('send-order-to-erp', {
      order: payload,
    });

    console.log('job:');
    console.log(job.id);

    return job;
  }

  getWebhookManifest(baseUrl: string): WebhookManifest {
    return {
      name: 'order-created',
      targetUrl: `${baseUrl}/webhooks/order-created`,
      asyncEvents: ['ORDER_CREATED'],
      isActive: true,
      query: gqlAstToString(OrderCreatedDocument),
    };
  }
}
