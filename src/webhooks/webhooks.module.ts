import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { OrderCreatedService } from './order-created/order-created.service';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [WebhooksController],
  providers: [OrderCreatedService],
  exports: [OrderCreatedService],
  imports: [
    BullModule.registerQueue({
      name: 'orders-export',
    }),
  ],
})
export class WebhooksModule {}
