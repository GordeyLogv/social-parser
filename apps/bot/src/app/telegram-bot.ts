import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { TYPES } from '../types';

import { MyContext } from '../adapters/inbound';

@injectable()
export class TelegramBot {
  public constructor(@inject(TYPES.Grammy) private readonly bot: Bot<MyContext>) {}

  private useMiddlewares(): void {}

  private useListenersMessages(): void {}

  private useCommands(): void {}

  private useCallbackQueries(): void {}

  private useExceptionFilter(): void {}

  public async init(): Promise<void> {
    this.useMiddlewares();
    this.useCommands();
    this.useCallbackQueries();
    this.useListenersMessages();
    this.useExceptionFilter();

    await this.bot.start();
  }
}
