import { Body, Controller, Headers, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { APL } from 'src/apl/apl';

const AuthDataSchema = z
  .object({
    auth_token: z.string(),
  })
  .required();

class AuthDataDto extends createZodDto(AuthDataSchema) {}

@Controller('register')
export class AppRegisterController {
  constructor(@Inject(APL) private apl: APL) {}

  @Post()
  receiveRegisterToken(
    @Body() body: AuthDataDto,
    @Res() response: Response,
    @Headers('saleor-api-url') saleorApiUrl: string,
  ) {
    console.log(this.apl);

    this.apl.set({ token: body.auth_token, appId: '', saleorApiUrl });

    return response.status(200).send();
  }
}
