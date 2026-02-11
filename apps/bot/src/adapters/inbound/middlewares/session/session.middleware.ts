import { inject, injectable } from 'inversify';
import { Bot, session } from 'grammy';

import { LoggerPort } from '@app/core';

import { TYPES } from '../../../../types';

import { IMyContext, MyContext, StepsEnum } from '../../context';

@injectable()
export class SessionMiddleware {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {
    this.logger.info(`[Middleware] ${SessionMiddleware.name} - loading success`);
  }

  public register(bot: Bot<MyContext>): void {
    bot.use(
      session({
        initial: (): IMyContext => ({
          step: StepsEnum.IDLE,
        }),
      }),
    );
  }
}
