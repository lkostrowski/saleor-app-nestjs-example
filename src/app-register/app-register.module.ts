import { Module } from '@nestjs/common';
import { AppRegisterController } from './app-register.controller';

@Module({
  controllers: [AppRegisterController]
})
export class AppRegisterModule {}
