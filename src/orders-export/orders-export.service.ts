import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Processor('orders-export')
@Injectable()
export class OrdersExportService {
  constructor(@InjectQueue('orders-export') private ordersQueue: Queue) {}

  @Process('export-orders')
  async transcode(job: Job<{ saleorApiUrl: string }>) {
    console.log(job.id);
    console.log(job.data);

    // await job.moveToCompleted();
  }
}
