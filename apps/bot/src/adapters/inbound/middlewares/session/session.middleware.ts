import { inject, injectable } from 'inversify';

import { Bot, session } from 'grammy';

import { LoggerPort } from '@app/core';

import { IMiddleware } from '../middleware.interface';
import { MyContext } from '../../../../context';
import { TOKENS } from '../../../../tokens';
import { ContextSteepEnum, SessionData } from '../../../../common';

@injectable()
export class SessionMiddleware implements IMiddleware {
  public constructor(@inject(TOKENS.SessionMiddlewareLogger) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.use(
      session({
        initial: (): SessionData => ({
          step: ContextSteepEnum.IDLE,
        }),
      }),
    );
  }
}
