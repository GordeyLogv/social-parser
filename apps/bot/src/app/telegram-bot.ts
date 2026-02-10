import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { TYPES } from '../types';

import { ExceptionFilterInfrastructurePort, MyContext } from '../adapters/inbound';

import { CallbackQueryRegistryHelper, CommandRegistryHelper } from '../shared';

@injectable()
export class TelegramBot {
  public constructor(
    @inject(TYPES.Grammy) private readonly bot: Bot<MyContext>,
    @inject(TYPES.ExceptionFilterPort) private readonly exceptionFilter: ExceptionFilterInfrastructurePort,

    @inject(TYPES.CommandsRegistryHelper) private readonly commands: CommandRegistryHelper,

    @inject(TYPES.CallbackQueryRegistryHelper) private readonly callbackQueries: CallbackQueryRegistryHelper,
  ) {}

  private useMiddlewares(): void {}

  private useListenersMessages(): void {}

  private useCommands(): void {
    this.commands.registryCommands(this.bot);
  }

  private useCallbackQueries(): void {
    this.callbackQueries.registryCallbackQueries(this.bot);
  }

  private useExceptionFilter(): void {
    this.bot.catch(({ error, ctx }) => this.exceptionFilter.handle(error, ctx));
  }

  public async init(): Promise<void> {
    this.useMiddlewares();
    this.useCommands();
    this.useCallbackQueries();
    this.useListenersMessages();
    this.useExceptionFilter();

    await this.bot.start();
  }
}
