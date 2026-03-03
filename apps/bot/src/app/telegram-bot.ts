import { inject, injectable } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';
import { CallbackQueriesRegistryHelper, CommandsRegistryHelper, MiddlewaresRegistryHelper } from '../common';
import { ExceptionFilterAdapter } from '../adapters';
import { MyContext } from '../context';

@injectable()
export class TelegramBot {
  public constructor(
    @inject(TOKENS.Grammy) private readonly bot: Bot<MyContext>,

    @inject(TOKENS.TelegramBotLogger) private readonly logger: LoggerPort,
    @inject(TOKENS.ExceptionFilterPort) private readonly exceptionFilter: ExceptionFilterAdapter,

    @inject(TOKENS.CommandsRegistryHelper) private readonly commands: CommandsRegistryHelper,
    @inject(TOKENS.CallbackQueriesRegistryHelper) private readonly callbackQueries: CallbackQueriesRegistryHelper,
    @inject(TOKENS.MiddlewaresRegistryHelper) private readonly middlewares: MiddlewaresRegistryHelper,
  ) {
    this.logger.info('Bot init');
  }

  private useMiddlewares() {
    this.middlewares.registryAllMiddlewares(this.bot);
  }

  private useListenersMessage() {}

  private useCommands() {
    this.commands.registryAllCommands(this.bot);
  }

  private useCallbackQueries() {
    this.callbackQueries.registryAllCallbackQueries(this.bot);
  }

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
