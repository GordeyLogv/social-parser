import { Controller, Inject } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    private readonly service: SearchService,
  ) {}
}
