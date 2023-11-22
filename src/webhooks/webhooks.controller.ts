import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreatedEventFragment } from 'generated/graphql';
import { OrderCreatedService } from './order-created/order-created.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private orderCreatedService: OrderCreatedService) {}

  // todo: graphql mapping invalid
  @Post('order-created')
  orderCreated(@Body() body: { orderCreated: OrderCreatedEventFragment }) {
    this.orderCreatedService.processWebhook(body.orderCreated);
  }
}
