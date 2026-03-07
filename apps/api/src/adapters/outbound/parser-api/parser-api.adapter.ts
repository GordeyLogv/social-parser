import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerPort } from '@app/core';
import {
  NormalizedErrorResponse,
  NormalizedErrorResponseSchema,
  SearchAccountResponse,
  SearchAccountResponseSchema,
} from '@app/contracts';

import { ParserApiPort } from './parser-api.port';

import { ApiError, ApiErrorCodesEnum, ApiErrorMessagesEnum } from '../../../common';

@Injectable()
export class ParserApiAdapter implements ParserApiPort {
  private readonly baseUrl: string;

  public constructor(
    private readonly logger: LoggerPort,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = config.getOrThrow<string>('BASE_URL_PARSER');
  }

  public async searchAccount(handle: string, platform: string): Promise<SearchAccountResponse> {
    this.logger.info(`Start`, { handle });

    const res = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle, platform }),
    });

    if (!res.ok) {
      let error: NormalizedErrorResponse;
      try {
        const text = await res.text();
        const json: unknown = text.length ? JSON.parse(text) : undefined;
        error = NormalizedErrorResponseSchema.parse(json);
      } catch (error) {
        this.logger.error('Error not custom error', { error });
        throw new ApiError(ApiErrorCodesEnum.BAD_REQUEST, ApiErrorMessagesEnum.BAD_REQUEST);
      }

      this.logger.warn('Error is custom error', { error });
      throw new ApiError(error.code, error.message);
    }

    let result: SearchAccountResponse;
    try {
      const json: unknown = await res.json();
      result = SearchAccountResponseSchema.parse(json);
    } catch (error) {
      this.logger.warn('Error parsing', { error });
      throw new ApiError(ApiErrorCodesEnum.PARS_ERROR, ApiErrorMessagesEnum.PARS_ERROR);
    }

    this.logger.info('Finded account', { account: result });
    return result;
  }
}
