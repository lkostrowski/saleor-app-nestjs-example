import { Test, TestingModule } from '@nestjs/testing';
import { ErpOrderExportService } from './erp-order-export.service';

describe('ErpOrderExportService', () => {
  let service: ErpOrderExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErpOrderExportService],
    }).compile();

    service = module.get<ErpOrderExportService>(ErpOrderExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
