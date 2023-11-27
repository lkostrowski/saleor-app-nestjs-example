import { Test, TestingModule } from '@nestjs/testing';
import { OtelController } from './otel.controller';

describe('OtelController', () => {
  let controller: OtelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtelController],
    }).compile();

    controller = module.get<OtelController>(OtelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
