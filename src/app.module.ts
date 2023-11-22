import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AplModule } from './apl/apl.module';
import { AppManifestModule } from './app-manifest/app-manifest.module';
import { AppRegisterModule } from './app-register/app-register.module';
import { GraphqlModule } from './graphql/graphql.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { join } from 'path';

@Module({
  imports: [
    AppManifestModule,
    AppRegisterModule,
    AplModule,
    GraphqlModule,
    WebhooksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'frontend', 'dist'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
