import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';
import { SearchAccountResponse } from '@app/contracts';

import { TOKENS } from '../../../tokens';
import { SearchService } from './search.service';

@Controller('/search')
export class SearchController {
  public constructor(
    @Inject(TOKENS.SearchControllerLogger) private readonly logger: LoggerPort,
    private readonly service: SearchService,
  ) {}

  @Post()
  async serachAccount(@Body() dto: { handle: string; platfrom: string }): Promise<SearchAccountResponse> {
    this.logger.info('Start controller', { dto });
    return this.service.search(dto.handle, dto.platfrom);
  }
}
