import { Test, TestingModule } from '@nestjs/testing';
import { AppRegisterController } from './app-register.controller';

describe('AppRegisterController', () => {
  let controller: AppRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppRegisterController],
    }).compile();

    controller = module.get<AppRegisterController>(AppRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
