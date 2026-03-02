import { Injectable } from '@nestjs/common';
import { ParserApiPort } from './parser-api.port';
import { LoggerPort } from '@app/core';

@Injectable()
export class ParserApiAdapter implements ParserApiPort {
  public constructor(private readonly logger: LoggerPort) {}

  public async searchAccount(handle: string, platform: string): Promise<string> {
    return await 'test';
  }
}
