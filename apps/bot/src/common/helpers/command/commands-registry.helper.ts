import { inject, injectable, multiInject } from 'inversify';
import { TOKENS } from '../../../tokens';
import { LoggerPort } from '@app/core';
import { ICommand } from '../../../adapters';
import { Bot, Context } from 'grammy';

@injectable()
export class CommandsRegistryHelper {
  public constructor(
    @inject(TOKENS.CommandsRegistryLogger) private readonly logger: LoggerPort,
    @multiInject(TOKENS.ICommand) private readonly commands: ICommand[],
  ) {}

  public registryAllCommands(bot: Bot<Context>): void {
    for (const command of this.commands) {
      this.logger.info(`${command.constructor.name} - loading success`);

      command.register(bot);
    }
  }
}
