import { Module } from '@nestjs/common';

import { AppManifestModule } from './app-manifest/app-manifest.module';
import { AppRegisterModule } from './app-register/app-register.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AplModule } from './apl/apl.module';
import { AppController } from './app.controller';

@Module({
  imports: [AppManifestModule, AppRegisterModule, AplModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
