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
import { GraphqlModule } from './graphql/graphql.module';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { OrdersExportModule } from './orders-export/orders-export.module';

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

@Module({
  imports: [
    AppManifestModule,
    AppRegisterModule,
    AplModule,
    GraphqlModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
    // }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6666,
        password: 'my-password',
      },
    }),
    OpenTelemetryModule.forRoot({
      serviceName: 'nestjs-opentelemetry-example',
      spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter({})),
      instrumentations: [new HttpInstrumentation({ enabled: true })],
      autoDetectResources: true,
    }),
    OrdersExportModule,
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
