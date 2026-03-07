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

  public async search(handle: string, platfrom: string) {
    this.logger.info('Start');

    const res = await this.api.searchByHandle(handle);

    this.logger.info('Result', { res });
    return res;
  }
}
