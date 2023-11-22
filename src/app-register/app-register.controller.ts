import { Body, Controller, Post, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import { FileAPL } from '@saleor/app-sdk/APL';

const AuthDataSchema = z
  .object({
    auth_token: z.string(),
  })
  .required();

class AuthDataDto extends createZodDto(AuthDataSchema) {}

@Controller('register')
export class AppRegisterController {
  @Post()
  receiveRegisterToken(
    @Body() body: AuthDataDto,
    @Res() response: Response,
    @Headers('saleor-api-url') saleorApiUrl: string,
  ) {
    const apl = new FileAPL();
    apl.set({ token: body.auth_token, appId: '', saleorApiUrl });

    return response.status(200).send();
  }
}
