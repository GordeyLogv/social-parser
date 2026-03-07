import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configRoot } from '../common/configs';

import { ApiYoutubeModule, LoggerModule } from '../adapters/outbound';
import { ExceptionFilterModule, SearchModule, UpdateModule } from '../adapters/inbound';

@Module({
  imports: [
    ConfigModule.forRoot(configRoot),
    ExceptionFilterModule,
    ApiYoutubeModule,
    LoggerModule,
    SearchModule,
    UpdateModule,
  ],
})
export class AppModule {}
