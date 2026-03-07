import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerPort } from '@app/core';
import { SearchAccountResponse, YouTubeChannelResponse, YouTubeChannelResponseChema } from '@app/contracts';

import { ApiYoutubePort } from './api-youtube.port';
import {
  ParserError,
  ParserErrorCodesEnum,
  ParserErrorMessagesEnum,
  youtubeMapperParsedAccount,
  youtubeUrlMapper,
} from '../../../common';

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

  public async searchByHandle(handle: string): Promise<SearchAccountResponse> {
    this.logger.info(`Start search youtube account by handle ${handle}`);

    const url = youtubeUrlMapper(this.youtubeBaseUrl, this.apiKey, handle);

    const res = await fetch(url);

    if (!res.ok) {
      this.logger.error('Bad request');
      throw new ParserError(ParserErrorCodesEnum.INVALID_MATCH, ParserErrorMessagesEnum.INVALID_MATCH);
    }

    let result: YouTubeChannelResponse;
    try {
      const json: unknown = await res.json();
      result = YouTubeChannelResponseChema.parse(json);
    } catch (error) {
      this.logger.error('Error', { error });
      throw new ParserError(ParserErrorCodesEnum.INVALID_JSON, ParserErrorMessagesEnum.INVALID_JSON);
    }

    if (result.items.length === 0) {
      this.logger.warn('Error parsed account not found');
      throw new ParserError(ParserErrorCodesEnum.NOT_FOUND, ParserErrorMessagesEnum.NOT_FOUND);
    }

    return youtubeMapperParsedAccount(result, handle);
  }
}
