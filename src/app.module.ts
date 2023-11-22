import { Module } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AplModule } from './apl/apl.module';
import { AppManifestModule } from './app-manifest/app-manifest.module';
import { AppRegisterModule } from './app-register/app-register.module';
import { AppController } from './app.controller';
import { GraphqlModule } from './graphql/graphql.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    AppManifestModule,
    AppRegisterModule,
    AplModule,
    GraphqlModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
