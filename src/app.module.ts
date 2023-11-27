import { OpenTelemetryModule } from '@amplication/opentelemetry-nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { BullModule } from '@nestjs/bull';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { join } from 'path';
import { AplModule } from './apl/apl.module';
import { AppManifestModule } from './app-manifest/app-manifest.module';
import { AppRegisterModule } from './app-register/app-register.module';
import { ErpOrderExportModule } from './erp-order-export/erp-order-export.module';
import { GraphqlModule } from './graphql/graphql.module';
import { OtelModule } from './otel/otel.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

@Module({
  imports: [
    AppManifestModule,
    AppRegisterModule,
    AplModule,
    GraphqlModule,
    WebhooksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'frontend', 'dist'),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6666,
        password: 'my-password',
      },
    }),
    ErpOrderExportModule,
    OpenTelemetryModule.forRoot({
      serviceName: 'nestjs-opentelemetry-example',
      spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter({})),
      instrumentations: [new HttpInstrumentation({ enabled: true })],
      autoDetectResources: true,
    }),
    OtelModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
