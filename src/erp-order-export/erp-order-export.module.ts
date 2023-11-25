import { Module } from '@nestjs/common';
import { ErpOrderExportService } from './erp-order-export.service';
import { ErpOrderExportController } from './erp-order-export.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [ErpOrderExportService],
  controllers: [ErpOrderExportController],
  imports: [
    BullModule.registerQueue({
      name: 'orders-export',
    }),
  ],
})
export class ErpOrderExportModule {}
