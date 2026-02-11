import { inject, injectable, multiInject } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TYPES } from '../../types';

import { IListenerMessage, MyContext } from '../../adapters/inbound';

@injectable()
export class ListerMessageRegistryHelper {
  public constructor(
    @inject(TYPES.LoggerPort) private readonly logger: LoggerPort,
    @multiInject(TYPES.IListenerMessage) private readonly listeners: IListenerMessage[],
  ) {}

  public registry(bot: Bot<MyContext>): void {
    for (const lister of this.listeners) {
      this.logger.info(`[Lister] ${lister.constructor.name} - loading success`);
    }

    bot.on('message:text', async (ctx) => {
      for (const listener of this.listeners) {
        const handled = await listener.handle(ctx);
        if (handled) break;
      }
    });
  }
}
