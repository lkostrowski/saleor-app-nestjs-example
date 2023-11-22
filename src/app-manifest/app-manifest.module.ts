import { Module } from '@nestjs/common';
import { AppManifestController } from './app-manifest.controller';
import { WebhooksModule } from 'src/webhooks/webhooks.module';

@Module({ imports: [WebhooksModule], controllers: [AppManifestController] })
export class AppManifestModule {}
