import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { OrderCreatedService } from './order-created/order-created.service';

@Module({
  controllers: [WebhooksController],
  providers: [OrderCreatedService],
  exports: [OrderCreatedService],
})
export class WebhooksModule {}
