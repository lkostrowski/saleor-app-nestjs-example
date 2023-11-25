import { Controller, Get } from '@nestjs/common';
import { ErpOrderExportService } from './erp-order-export.service';

@Controller('erp-order-export')
export class ErpOrderExportController {
  constructor(private erpOrderExportService: ErpOrderExportService) {}

  @Get('last-jobs')
  getLastJobs() {
    return this.erpOrderExportService.getLastJobs();
  }
}
