import { Inject, Injectable } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ApiYoutubePort } from '../../outbound/api-youtube/api-youtube.port';

@Injectable()
export class SearchService {
  public constructor(
    @Inject(TOKENS.SearchServiceLogger) private readonly logger: LoggerPort,
    @Inject(TOKENS.ApiYoutubePort) private readonly api: ApiYoutubePort,
  ) {}

  public async search(input: { handle: string; platform: string }) {
    this.logger.info('Start');
    const res = await this.api.searchByHandle(input.handle, input.platform);

    this.logger.info('Result', { res });
  }
}
