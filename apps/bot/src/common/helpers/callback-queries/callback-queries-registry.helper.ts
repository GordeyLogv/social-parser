import { inject, injectable, multiInject } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ICallbackQuery } from '../../../adapters';

@injectable()
export class CallbackQueriesRegistryHelper {
  public constructor(
    @inject(TOKENS.CallbackQueriesRegistryLogger) private readonly logger: LoggerPort,
    @multiInject(TOKENS.ICallbackQuery) private readonly callbackQueries: ICallbackQuery[],
  ) {}

  public registryAllCallbackQueries(bot: Bot<Context>): void {
    for (const callbackQuery of this.callbackQueries) {
      this.logger.info(`${callbackQuery.constructor.name} - loading success`);

      callbackQuery.register(bot);
    }
  }
}
