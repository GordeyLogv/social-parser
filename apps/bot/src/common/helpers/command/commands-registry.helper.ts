import { inject, injectable, multiInject } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ICommand } from '../../../adapters';
import { MyContext } from '../../../context';

@injectable()
export class CommandsRegistryHelper {
  public constructor(
    @inject(TOKENS.CommandsRegistryLogger) private readonly logger: LoggerPort,
    @multiInject(TOKENS.ICommand) private readonly commands: ICommand[],
  ) {}

  public registryAllCommands(bot: Bot<MyContext>): void {
    for (const command of this.commands) {
      this.logger.info(`${command.constructor.name} - loading success`);

      command.register(bot);
    }
  }
}
