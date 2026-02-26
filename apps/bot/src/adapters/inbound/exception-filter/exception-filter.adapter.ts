import { inject, injectable } from 'inversify';

import { Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { normalizedErrorHelper, ExceptionFilterPort } from '../../../common';
import { ErrorMessageMapper } from './error-message.mapper';

@injectable()
export class ExceptionFilterAdapter implements ExceptionFilterPort {
  public constructor(@inject(TOKENS.ExceptionFilterLogger) private readonly logger: LoggerPort) {}

  public async handle(error: unknown, ctx: Context): Promise<void> {
    const normalizedError = normalizedErrorHelper(error);

    const errorMessageMapped = ErrorMessageMapper[normalizedError.message];

    switch (normalizedError.logLevel) {
      case 'warn':
        this.logger.warn(`${normalizedError.code} - ${normalizedError.message}`);
        break;
      case 'error':
        this.logger.error(`${normalizedError.code} - ${normalizedError.message}`);
        break;
    }

    await ctx.reply(errorMessageMapped);
  }
}
