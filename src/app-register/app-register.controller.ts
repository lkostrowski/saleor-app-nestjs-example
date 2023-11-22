import { Body, Controller, Headers, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { APL } from 'src/apl/apl';
import { createGraphQLClient } from 'src/graphql/graphql-client';
import { AppDocument } from '../../generated/graphql';

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
  async receiveRegisterToken(
    @Body() body: AuthDataDto,
    @Res() response: Response,
    @Headers('saleor-api-url') saleorApiUrl: string,
  ) {
    const graphqlClient = createGraphQLClient({
      saleorApiUrl,
      token: body.auth_token,
    });

    const appResponse = await graphqlClient.query(AppDocument, {});
    const appId = appResponse.data.app.id;

    this.apl.set({ token: body.auth_token, appId, saleorApiUrl });

    return response.status(200).send();
  }
}
