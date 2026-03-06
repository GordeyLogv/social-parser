import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';

@Injectable()
export class SearchService {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    private readonly config: ConfigService,
  ) {}
}
