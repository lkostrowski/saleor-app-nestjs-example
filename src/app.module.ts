import { Module } from '@nestjs/common';

import { AppManifestModule } from './app-manifest/app-manifest.module';

@Module({
  imports: [AppManifestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
