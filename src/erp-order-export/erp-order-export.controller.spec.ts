import { Test, TestingModule } from '@nestjs/testing';
import { ErpOrderExportController } from './erp-order-export.controller';

describe('ErpOrderExportController', () => {
  let controller: ErpOrderExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErpOrderExportController],
    }).compile();

    controller = module.get<ErpOrderExportController>(ErpOrderExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
