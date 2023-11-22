import { Module } from '@nestjs/common';
import { AppRegisterController } from './app-register.controller';
import { AplModule } from 'src/apl/apl.module';

@Module({
  imports: [AplModule],
  controllers: [AppRegisterController],
})
export class AppRegisterModule {}
