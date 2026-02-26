import { ConfigPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';
import { Container } from 'inversify';
import { TOKENS } from '../tokens';
import { ConfigAdapter, LoggerAdapter, UserApiAdapter, UserApiPort } from '../adapters/outbound';
import { Bot, Context } from 'grammy';
import { TelegramBot } from '../app/telegram-bot';
import { StartCommand } from '../adapters/inbound/commands/start/start.command';
import { ICommand } from '../adapters';
import { CommandsRegistryHelper } from '../common';
import { ExceptionFilterAdapter } from '../adapters/inbound/exception-filter/exception-filter.adapter';

export const initContainer = (): Container => {
  const container = new Container();

  // Adapters
  container
    .bind<LoggerPort>(TOKENS.LoggerPort)
    .toDynamicValue(() => {
      return new LoggerAdapter(LoggerAppEnum.BOT, LoggerHandleEnum.ADAPTER, LoggerAdapter.name);
    })
    .inSingletonScope();

  container.bind<ExceptionFilterAdapter>(TOKENS.ExceptionFilterPort).to(ExceptionFilterAdapter).inSingletonScope();

  container.bind<ConfigPort>(TOKENS.ConfigPort).to(ConfigAdapter).inSingletonScope();

  container.bind<UserApiPort>(TOKENS.UserApiPort).to(UserApiAdapter).inSingletonScope();

  // Logging
  container
    .bind<LoggerPort>(TOKENS.ConfigLogger)
    .toDynamicValue((ctx) => ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandleName(ConfigAdapter.name))
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.UserApiLogger)
    .toDynamicValue((ctx) => ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandleName(UserApiAdapter.name))
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.StartCommandLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.COMMAND).withHandleName(StartCommand.name),
    )
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.TelegramBotLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.APP).withHandleName(TelegramBot.name),
    )
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.CommandsRegistryLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.HELPER).withHandleName(CommandsRegistryHelper.name),
    );

  container
    .bind<LoggerPort>(TOKENS.ExceptionFilterLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.EXCEPTION_FILTER)
        .withHandleName(ExceptionFilterAdapter.name),
    );

  // Commands
  container.bind<ICommand>(TOKENS.ICommand).to(StartCommand).inSingletonScope();
  container.bind<CommandsRegistryHelper>(TOKENS.CommandsRegistry).to(CommandsRegistryHelper).inSingletonScope();

  container
    .bind<Bot<Context>>(TOKENS.Grammy)
    .toDynamicValue((ctx) => {
      const config = ctx.get<ConfigPort>(TOKENS.ConfigPort);
      const token = config.get('BOT_TOKEN');
      return new Bot(token);
    })
    .inRequestScope();

  container.bind<TelegramBot>(TOKENS.TelegramBot).to(TelegramBot).inSingletonScope();

  return container;
};
