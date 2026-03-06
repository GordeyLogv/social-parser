import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { SearchService } from './search.service';
import { SearchAccountDto } from './dto';
import { SearchAccountResponse } from '@app/contracts';

@Controller('/search')
export class SearchController {
  public constructor(
    @Inject(TOKENS.SearchControllerLogger) private readonly logger: LoggerPort,
    private readonly service: SearchService,
  ) {}

  @Post()
  async serachAccount(@Body() dto: { handle: string; platform: string }): Promise<any> {
    this.logger.info('Start controller', { dto });
    return this.service.search(dto);
  }
}
