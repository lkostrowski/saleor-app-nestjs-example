import { Global, Module } from '@nestjs/common';
import { FileAPL } from '@saleor/app-sdk/APL';
import { APL } from './apl';

@Global()
@Module({
  providers: [
    {
      provide: APL,
      useValue: new FileAPL(),
    },
  ],
  exports: [APL],
})
export class AplModule {}
