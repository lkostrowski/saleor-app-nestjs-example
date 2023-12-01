import { Module } from '@nestjs/common';
import { OrdersExportController } from './orders-export.controller';
import { BullModule } from '@nestjs/bull';
import { OrdersExportService } from './orders-export.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders-export',
    }),
  ],
  controllers: [OrdersExportController],
  providers: [OrdersExportService],
})
export class OrdersExportModule {}
