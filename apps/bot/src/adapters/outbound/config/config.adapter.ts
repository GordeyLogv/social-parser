import { inject, injectable } from 'inversify';
import 'dotenv/config';

import { ConfigPort, LoggerPort } from '@app/core';

import { TYPES } from '../../../types';

@injectable()
export class ConfigAdapter implements ConfigPort {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {
    this.logger.info(`[Adapter] ${ConfigAdapter.name} - loading success`);
  }

  public get(key: string): string {
    const value = process.env[key];

    if (!value) {
      throw new Error(`[Adapter] ${ConfigAdapter.name} - value not found`);
    }

    return value;
  }
}
