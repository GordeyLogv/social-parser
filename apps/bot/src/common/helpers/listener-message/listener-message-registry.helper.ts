import { inject, injectable, multiInject } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { IListerMessage } from '../../../adapters';
import { MyContext } from '../../../context';

@injectable()
export class ListenerMessageRegistryHelper {
  public constructor(
    @inject(TOKENS.ListenersMessageRigistrtLogger) private readonly logger: LoggerPort,
    @multiInject(TOKENS.IListenerMessage) private readonly listeners: IListerMessage[],
  ) {}

  public registryAllListenersMessages(bot: Bot<MyContext>): void {
    for (const listener of this.listeners) {
      this.logger.info(`${listener.constructor.name} - loading success`);
    }

    bot.on('message:text', async (ctx) => {
      for (const listener of this.listeners) {
        const handled = await listener.handle(ctx);
        if (handled) break;
      }
    });
  }
}
