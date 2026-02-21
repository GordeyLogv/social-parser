import { inject, injectable } from 'inversify';
import 'dotenv/config';

import { ConfigPort, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';

@injectable()
export class ConfigAdapter implements ConfigPort {
  public constructor(@inject(TOKENS.LoggerPort) private readonly logger: LoggerPort) {
    this.logger.info(`[${ConfigAdapter.name}] => loading success`);
  }

  public get(key: string): string {
    const value = process.env[key];

    if (!value) {
      this.logger.error('Значение не найдено', { key });
      throw new Error('Значение не найдено');
    }

    return value;
  }
}
