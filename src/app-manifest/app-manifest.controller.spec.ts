import { Test, TestingModule } from '@nestjs/testing';
import { AppManifestController } from './app-manifest.controller';

describe('AppManifestController', () => {
  let controller: AppManifestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppManifestController],
    }).compile();

    controller = module.get<AppManifestController>(AppManifestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
