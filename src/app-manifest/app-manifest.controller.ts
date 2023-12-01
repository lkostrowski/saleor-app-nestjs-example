import { Controller, Get } from '@nestjs/common';
import { AppManifest } from '@saleor/app-sdk/types';

@Controller('manifest')
export class AppManifestController {
  @Get()
  // todo: make service
  getManifest(): AppManifest {
    return {
      id: 'saleor-app-nestjs',
      version: '0.0.1',
      name: 'Saleor App (Nestjs)',
      about: 'Saleor App description',
      permissions: ['MANAGE_ORDERS'],
      appUrl: 'http://localhost:5173',
      tokenTargetUrl: 'http://host.docker.internal:3000/register', //todo -env
      author: 'Lukasz Ostrowski',
    };
  }
}
