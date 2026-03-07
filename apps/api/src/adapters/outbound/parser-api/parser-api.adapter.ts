import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerPort } from '@app/core';

import { ParserApiPort } from './parser-api.port';
import { SearchAccountResponse } from '@app/contracts';

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

    const res = fetch(`${this.baseUrl}/search`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle, platform }),
    });

    if (!res.ok) {
      throw new 
    }
  }
}
