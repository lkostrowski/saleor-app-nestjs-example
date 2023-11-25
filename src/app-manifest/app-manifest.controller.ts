import { Controller, Get } from '@nestjs/common';
import { AppManifest } from '@saleor/app-sdk/types';
import { OrderCreatedService } from 'src/webhooks/order-created/order-created.service';

@Controller('manifest')
export class AppManifestController {
  constructor(private orderCreatedService: OrderCreatedService) {}

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
      webhooks: [
        this.orderCreatedService.getWebhookManifest(
          'http://host.docker.internal:3000',
        ),
      ],
    };
  }
}
