import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreatedEventFragment } from 'generated/graphql';
import { OrderCreatedService } from './order-created/order-created.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private orderCreatedService: OrderCreatedService) {}

  @Post('order-created')
  orderCreated(@Body() body: OrderCreatedEventFragment) {
    console.log('orderCreated', body);
  }
}
