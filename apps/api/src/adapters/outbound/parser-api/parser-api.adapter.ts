import { Inject, Injectable } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { ParserApiPort } from './parser-api.port';

@Injectable()
export class ParserApiAdapter implements ParserApiPort {
  public constructor(private readonly logger: LoggerPort) {}

  public async searchAccount(handle: string, platform: string): Promise<string> {
    new Error('Not implements');
  }
}
