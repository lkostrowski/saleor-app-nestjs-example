import { Controller, Get, Logger } from '@nestjs/common';
import { SpanKind } from '@opentelemetry/api';
import { Tracer } from '@opentelemetry/sdk-trace-base';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';

@Controller('otel')
export class OtelController {
  constructor(private tracer: Tracer) {}
  @Get()
  async otel() {
    await this.foo();

    Logger.log('some log');

    return 'ok';
  }

  private async foo() {
    const span = this.tracer.startSpan('external', {
      kind: SpanKind.CLIENT,
      attributes: {
        [SemanticAttributes.PEER_SERVICE]: 'adyen',
      },
    });

    await fetch('https://jsonplaceholder.typicode.com/todos/1').then((r) =>
      r.json(),
    );

    span.end();
  }
}
