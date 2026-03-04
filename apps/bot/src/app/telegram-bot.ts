import { inject, injectable } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';
import {
  CallbackQueriesRegistryHelper,
  CommandsRegistryHelper,
  ListenerMessageRegistryHelper,
  MiddlewaresRegistryHelper,
} from '../common';
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
    @inject(TOKENS.ListenersMessageRegistryHelper) private readonly listeners: ListenerMessageRegistryHelper,
  ) {}

  private registerMiddlewares() {
    this.middlewares.registryAllMiddlewares(this.bot);
  }

  private registerListenersMessage() {
    this.listeners.registryAllListenersMessages(this.bot);
  }

  private registerCommands() {
    this.commands.registryAllCommands(this.bot);
  }

  private registerCallbackQueries() {
    this.callbackQueries.registryAllCallbackQueries(this.bot);
  }

  private registerExceptionFilter() {
    this.bot.catch(async ({ error, ctx }) => this.exceptionFilter.handle(error, ctx));
  }

  public async init() {
    this.registerExceptionFilter();
    this.registerMiddlewares();
    this.registerCommands();
    this.registerCallbackQueries();
    this.registerListenersMessage();

    this.logger.info('Bot success init');
    await this.bot.start();
  }
}
