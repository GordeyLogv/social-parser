import { Container } from 'inversify';
import { Bot } from 'grammy';

import { ConfigPort, LoggerPort, UserGreetingUseCase } from '@app/core';

import { ExceptionFilterAdapter, ExceptionFilterInfrastructurePort, MyContext, StartCommand } from '../adapters/inbound';
import { LoggerAdapter, ConfigAdapter } from '../adapters/outbound';

import { TYPES } from '../types';

import { TelegramBot } from '../app';

import { CommandRegistryHelper, ICommand } from '../shared';

export const initContainer = () => {
  const container = new Container();

  container.bind<LoggerPort>(TYPES.LoggerPort).to(LoggerAdapter).inSingletonScope();
  container.bind<ConfigPort>(TYPES.ConfigPort).to(ConfigAdapter).inSingletonScope();
  container.bind<ExceptionFilterInfrastructurePort>(TYPES.ExceptionFilterPort).to(ExceptionFilterAdapter).inSingletonScope();

  container
    .bind<UserGreetingUseCase>(TYPES.UserGreetingUseCase)
    .toDynamicValue((ctx) => {
      const logger = ctx.get<LoggerPort>(TYPES.LoggerPort);
      return new UserGreetingUseCase(logger);
    })
    .inSingletonScope();

  container.bind<ICommand>(TYPES.ICommand).to(StartCommand).inSingletonScope();
  container.bind<CommandRegistryHelper>(TYPES.CommandsRegistryHelper).to(CommandRegistryHelper).inSingletonScope();

  container
    .bind<Bot<MyContext>>(TYPES.Grammy)
    .toDynamicValue((ctx) => {
      const config = ctx.get<ConfigPort>(TYPES.ConfigPort);
      const token = config.get('BOT_TOKEN');

      return new Bot(token);
    })
    .inSingletonScope();

  container.bind<TelegramBot>(TYPES.TelegramBot).to(TelegramBot).inSingletonScope();

  return container;
};
