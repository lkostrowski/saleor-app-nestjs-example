import { Module } from '@nestjs/common';

import { AppManifestModule } from './app-manifest/app-manifest.module';
import { AppRegisterModule } from './app-register/app-register.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [AppManifestModule, AppRegisterModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
