import { inject, injectable } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';
import { CommandsRegistryHelper } from '../common';
import { ExceptionFilterAdapter } from '../adapters';

@injectable()
export class TelegramBot {
  public constructor(
    @inject(TOKENS.Grammy) private readonly bot: Bot<Context>,

    @inject(TOKENS.TelegramBotLogger) private readonly logger: LoggerPort,
    @inject(TOKENS.ExceptionFilterPort) private readonly exceptionFilter: ExceptionFilterAdapter,

    @inject(TOKENS.CommandsRegistry) private commands: CommandsRegistryHelper,
  ) {
    this.logger.info('Bot init');
  }

  private useMiddlewares() {}

  private useListenersMessage() {}

  private useCommands() {
    this.commands.registryAllCommands(this.bot);
  }

  private useCallbackQueries() {}

  private useExceptionFilter() {
    this.bot.catch(async ({ error, ctx }) => this.exceptionFilter.handle(error, ctx));
  }

  public async init() {
    this.useMiddlewares();
    this.useListenersMessage();
    this.useCommands();
    this.useCallbackQueries();
    this.useExceptionFilter();

    await this.bot.start();
  }
}
