import { inject, injectable } from 'inversify';

import { LoggerPort } from '@app/core';

import { ExceptionFilterInfrastructurePort, normalizeErrorHelper } from './';

import { MyContext } from '../context';

import { TYPES } from '../../../types';

@injectable()
export class ExceptionFilterAdapter implements ExceptionFilterInfrastructurePort {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {
    this.logger.info(`[Adapter] ${ExceptionFilterAdapter.name} - loading success`);
  }

  public async handle(error: unknown, ctx: MyContext): Promise<void> {
    const normalizedError = normalizeErrorHelper(error);

    switch (normalizedError.logLevel) {
      case 'info':
        this.logger.info(
          `[Adapter] ${ExceptionFilterAdapter.name} [${normalizedError.logLevel}] - code: ${normalizedError.code}`,
        );
        break;
      case 'warn':
        this.logger.warn(
          `[Adapter] ${ExceptionFilterAdapter.name} [${normalizedError.logLevel}] - code: ${normalizedError.code}`,
        );
        break;
      case 'error':
        this.logger.error(
          `[Adapter] ${ExceptionFilterAdapter.name} [${normalizedError.logLevel}] - code: ${normalizedError.code}`,
        );
        break;
      default: {
        const never: never = normalizedError.logLevel;
        return never;
      }
    }

    await ctx.reply(normalizedError.message);
  }
}
