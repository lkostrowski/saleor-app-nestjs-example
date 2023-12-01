import { Test, TestingModule } from '@nestjs/testing';
import { OrdersExportController } from './orders-export.controller';

describe('OrdersExportController', () => {
  let controller: OrdersExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersExportController],
    }).compile();

    controller = module.get<OrdersExportController>(OrdersExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
