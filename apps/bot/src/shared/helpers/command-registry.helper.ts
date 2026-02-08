import { inject, injectable, multiInject } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { ICommand } from '../interafeces';

import { TYPES } from '../../types';

import { MyContext } from '../../adapters/inbound';

@injectable()
export class CommandRegistryHelper {
  public constructor(
    @inject(TYPES.LoggerPort) private readonly logger: LoggerPort,
    @multiInject(TYPES.ICommand) private readonly commands: ICommand[],
  ) {}

  public registryCommands(bot: Bot<MyContext>): void {
    for (const command of this.commands) {
      this.logger.info(`[Command] ${command.constructor.name} - loading success`);
      command.register(bot);
    }
  }
}
