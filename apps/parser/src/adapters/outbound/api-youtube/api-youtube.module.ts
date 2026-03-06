import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ApiYoutubeAdapter } from './api-youtube.adapter';

@Module({
  providers: [
    {
      provide: TOKENS.ApiYoutubeLogger,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.ADAPTER).withHandleName(ApiYoutubeAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.ApiYoutubePort,
      useFactory: (logger: LoggerPort, config: ConfigService) => new ApiYoutubeAdapter(logger, config),
      inject: [TOKENS.ApiYoutubeLogger, ConfigService],
    },
  ],
  exports: [TOKENS.ApiYoutubePort],
})
export class ApiYoutubeModule {}
