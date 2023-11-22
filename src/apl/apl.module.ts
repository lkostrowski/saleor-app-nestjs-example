import { Module } from '@nestjs/common';
import { APL } from './apl';
import { FileAPL } from '@saleor/app-sdk/APL';

@Module({
  providers: [
    {
      provide: APL,
      useClass: FileAPL,
    },
  ],
  exports: [APL],
})
export class AplModule {}
