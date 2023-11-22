import { Module } from '@nestjs/common';
import { AppManifestController } from './app-manifest.controller';

@Module({
  controllers: [AppManifestController],
})
export class AppManifestModule {}
