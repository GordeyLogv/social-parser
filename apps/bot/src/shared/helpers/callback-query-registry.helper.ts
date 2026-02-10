import { inject, injectable, multiInject } from 'inversify';
import { Bot } from 'grammy';

import { TYPES } from '../../types';

import { LoggerPort } from '@app/core';

import { ICallbackQuery, MyContext } from '../../adapters/inbound';

@injectable()
export class CallbackQueryRegistryHelper {
  public constructor(
    @inject(TYPES.LoggerPort) private readonly logger: LoggerPort,
    @multiInject(TYPES.ICallbackQuery) private readonly callbacks: ICallbackQuery[],
  ) {}

  public registryCallbackQueries(bot: Bot<MyContext>): void {
    for (const callback of this.callbacks) {
      this.logger.info(`[CallbackQuery] ${callback.constructor.name} - loading success`);
      callback.register(bot);
    }
  }
}
