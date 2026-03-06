import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TOKENS } from '../../../tokens';
import { ApiYoutubeModule } from '../../outbound';

@Module({
  imports: [ApiYoutubeModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: TOKENS.SearchControllerLogger,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.CONTROLLER).withHandleName(SearchController.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.SearchServiceLogger,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.SERVICE).withHandleName(SearchService.name),
      inject: [TOKENS.LoggerPort],
    },
  ],
})
export class SearchModule {}
