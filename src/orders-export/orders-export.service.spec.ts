import { Test, TestingModule } from '@nestjs/testing';
import { OrdersExportService } from './orders-export.service';

describe('OrdersExportService', () => {
  let service: OrdersExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersExportService],
    }).compile();

    service = module.get<OrdersExportService>(OrdersExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
