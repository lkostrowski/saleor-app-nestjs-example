import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { verifyJWT } from '@saleor/app-sdk/verify-jwt';
import { APL } from 'src/apl/apl';
import { Queue } from 'bull';

@Controller('orders-export')
export class OrdersExportController {
  constructor(
    private apl: APL,
    @InjectQueue('orders-export') private ordersQueue: Queue,
  ) {}

  // todo extract guard with token verification
  @Post('start')
  async startOrdersExport(
    @Body() body: { saleorApiUrl: string },
    @Headers('Authorization') token: string,
  ) {
    const authData = await this.apl.get(body.saleorApiUrl);

    // TODO: Enable, JWT fails
    // await verifyJWT({
    //   appId: authData.appId,
    //   saleorApiUrl: authData.saleorApiUrl,
    //   token,
    // });

    const job = await this.ordersQueue.add('export-orders', {
      saleorApiUrl: body.saleorApiUrl,
      token: authData.token, //todo should token be passed here?
    });

    return { jobId: job.id };
  }

  @Get(':job/status')
  async getJobStatus(@Param('job') job: string) {
    const jobStatus = await this.ordersQueue.getJob(job);

    return jobStatus;
  }
}
