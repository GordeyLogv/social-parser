import { Container } from 'inversify';

import { Bot, Context } from 'grammy';

import { ConfigPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';

import { ConfigAdapter, LoggerAdapter, UserApiAdapter, UserApiPort } from '../adapters/outbound';
import { StartCommand, ExceptionFilterAdapter, HelpCallbackQuery, ICallbackQuery, ICommand } from '../adapters/inbound';

import { CallbackQueriesRegistryHelper, CommandsRegistryHelper } from '../common';

import { TelegramBot } from '../app/telegram-bot';

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
    .bind<LoggerPort>(TOKENS.ExceptionFilterLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.EXCEPTION_FILTER)
        .withHandleName(ExceptionFilterAdapter.name),
    );
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
    .bind<LoggerPort>(TOKENS.CommandsRegistryLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.HELPER).withHandleName(CommandsRegistryHelper.name),
    );

  container
    .bind<LoggerPort>(TOKENS.HelpCallbackQueryLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.CALLBACK).withHandleName(HelpCallbackQuery.name),
    );
  container
    .bind<LoggerPort>(TOKENS.CallbackQueriesRegistryLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.HELPER)
        .withHandleName(CallbackQueriesRegistryHelper.name),
    );

  container
    .bind<LoggerPort>(TOKENS.TelegramBotLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.APP).withHandleName(TelegramBot.name),
    )
    .inSingletonScope();

  // Commands
  container.bind<ICommand>(TOKENS.ICommand).to(StartCommand).inSingletonScope();
  container.bind<CommandsRegistryHelper>(TOKENS.CommandsRegistryHelper).to(CommandsRegistryHelper).inSingletonScope();

  // CallbackQueries
  container.bind<ICallbackQuery>(TOKENS.ICallbackQuery).to(HelpCallbackQuery).inSingletonScope();
  container
    .bind<CallbackQueriesRegistryHelper>(TOKENS.CallbackQueriesRegistryHelper)
    .to(CallbackQueriesRegistryHelper)
    .inSingletonScope();

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
