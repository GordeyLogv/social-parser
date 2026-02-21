import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { Bot, Context } from 'grammy';

@injectable()
export class TelegramBot {
  public constructor(@inject(TOKENS.Grammy) private readonly bot: Bot<Context>) {}

  private useMiddlewares() {}

  private useListenersMessage() {}

  private useCommands() {}

  private useCallbackQueries() {}

  private useExceptionFilter() {}

  public async init() {
    this.useMiddlewares();
    this.useListenersMessage();
    this.useCommands();
    this.useCallbackQueries();
    this.useExceptionFilter();

    await this.bot.start();
  }
}
