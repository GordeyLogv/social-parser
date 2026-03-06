import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerPort } from '@app/core';
import { SearchAccountRequest, SearchAccountResponse } from '@app/contracts';

import { ApiYoutubePort } from './api-youtube.port';
import { ParserError, ParserErrorCodesEnum, ParserErrorMessagesEnum, youtubeUrlMapper } from '../../../common';

@Injectable()
export class ApiYoutubeAdapter implements ApiYoutubePort {
  private readonly apiKey: string;
  private readonly youtubeBaseUrl: string;

  public constructor(
    private readonly logger: LoggerPort,
    private readonly config: ConfigService,
  ) {
    this.apiKey = config.getOrThrow<string>('YOUTUBE_API_KEY');
    this.youtubeBaseUrl = config.getOrThrow<string>('YOUTUBE_BASE_URL');
  }

  public async searchByHandle(handle: string, platform: string) {
    this.logger.info(`Start search youtube account by handle ${handle}`);

    const url = youtubeUrlMapper(this.youtubeBaseUrl, this.apiKey, handle);

    const res = await fetch(url);

    if (res.ok) {
      const result = await res.json();
      this.logger.info('Result', { result: JSON.stringify(result, null, 2) });
      return result;
    }

    const text = await res.text();
    const parsed = text ? JSON.parse(text) : null;

    if (!parsed) {
      throw new ParserError(ParserErrorCodesEnum.INVALID_MATCH, ParserErrorMessagesEnum.INVALID_MATCH);
    }

    this.logger.error(`Error`, { parsed });
  }
}
