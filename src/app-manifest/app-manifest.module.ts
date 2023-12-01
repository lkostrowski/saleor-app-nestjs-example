import { Module } from '@nestjs/common';
import { AppManifestController } from './app-manifest.controller';

@Module({ imports: [], controllers: [AppManifestController] })
export class AppManifestModule {}
