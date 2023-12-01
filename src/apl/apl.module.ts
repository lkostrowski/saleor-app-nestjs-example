import { Global, Module } from '@nestjs/common';
import { APL } from './apl';
import { FileAPL } from '@saleor/app-sdk/APL';

@Global()
@Module({
  providers: [
    {
      provide: APL,
      useValue: new FileAPL({ fileName: 'apl.json' }),
    },
  ],
  exports: [APL],
})
export class AplModule {}
