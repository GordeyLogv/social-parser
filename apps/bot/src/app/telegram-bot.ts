import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { Bot, Context } from 'grammy';
import { StartCommand } from '../adapters';
import { LoggerPort } from '@app/core';

@injectable()
export class TelegramBot {
  public constructor(
    @inject(TOKENS.TelegramBotLogger) private logger: LoggerPort,
    @inject(TOKENS.Grammy) private readonly bot: Bot<Context>,
    @inject(TOKENS.StartCommand) private readonly startCommand: StartCommand,
  ) {
    this.logger.info('Bot init');
  }

  private useMiddlewares() {}

  private useListenersMessage() {}

  private useCommands() {
    this.startCommand.register(this.bot);
  }

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
