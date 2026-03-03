import { Container } from 'inversify';

import { Bot } from 'grammy';

import { ConfigPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';

import { ConfigAdapter, LoggerAdapter, ServerApiAdapter, ServerApiPort } from '../adapters/outbound';
import {
  StartCommand,
  ExceptionFilterAdapter,
  HelpCallbackQuery,
  ICallbackQuery,
  ICommand,
  MenuCallbackQuery,
  AddAccountCallbackQuery,
  SessionMiddleware,
  IMiddleware,
  ChoosedPlatfromCallbackQuery,
} from '../adapters/inbound';

import { CallbackQueriesRegistryHelper, CommandsRegistryHelper, MiddlewaresRegistryHelper } from '../common';

import { TelegramBot } from '../app/telegram-bot';

import { MyContext } from '../context';

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
  container.bind<ServerApiPort>(TOKENS.ServerApiPort).to(ServerApiAdapter).inSingletonScope();

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
    )
    .inSingletonScope();
  container
    .bind<LoggerPort>(TOKENS.ServerApiLogger)
    .toDynamicValue((ctx) => ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandleName(ServerApiAdapter.name))
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.SessionMiddlewareLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.MIDDLEWARE).withHandleName(SessionMiddleware.name),
    );
  container
    .bind<LoggerPort>(TOKENS.MiddlewaresRegistryLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.HELPER)
        .withHandleName(MiddlewaresRegistryHelper.name),
    );

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
    )
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.MenuCallbackQueryLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.CALLBACK).withHandleName(MenuCallbackQuery.name),
    )
    .inSingletonScope();
  container
    .bind<LoggerPort>(TOKENS.HelpCallbackQueryLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.CALLBACK).withHandleName(HelpCallbackQuery.name),
    )
    .inSingletonScope();
  container
    .bind<LoggerPort>(TOKENS.AddAccountCallbackQueryLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.CALLBACK)
        .withHandleName(AddAccountCallbackQuery.name),
    );
  container
    .bind<LoggerPort>(TOKENS.ChoosedPlatformCallbackQueryLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.CALLBACK)
        .withHandleName(ChoosedPlatfromCallbackQuery.name),
    );
  container
    .bind<LoggerPort>(TOKENS.CallbackQueriesRegistryLogger)
    .toDynamicValue((ctx) =>
      ctx
        .get<LoggerPort>(TOKENS.LoggerPort)
        .withHandle(LoggerHandleEnum.HELPER)
        .withHandleName(CallbackQueriesRegistryHelper.name),
    )
    .inSingletonScope();

  container
    .bind<LoggerPort>(TOKENS.TelegramBotLogger)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.APP).withHandleName(TelegramBot.name),
    )
    .inSingletonScope();

  // Middlewares
  container.bind<IMiddleware>(TOKENS.IMiddleware).to(SessionMiddleware).inSingletonScope();
  container
    .bind<MiddlewaresRegistryHelper>(TOKENS.MiddlewaresRegistryHelper)
    .to(MiddlewaresRegistryHelper)
    .inSingletonScope();

  // Commands
  container.bind<ICommand>(TOKENS.ICommand).to(StartCommand).inSingletonScope();
  container.bind<CommandsRegistryHelper>(TOKENS.CommandsRegistryHelper).to(CommandsRegistryHelper).inSingletonScope();

  // CallbackQueries
  container.bind<ICallbackQuery>(TOKENS.ICallbackQuery).to(MenuCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TOKENS.ICallbackQuery).to(HelpCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TOKENS.ICallbackQuery).to(AddAccountCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TOKENS.ICallbackQuery).to(ChoosedPlatfromCallbackQuery).inSingletonScope();
  container
    .bind<CallbackQueriesRegistryHelper>(TOKENS.CallbackQueriesRegistryHelper)
    .to(CallbackQueriesRegistryHelper)
    .inSingletonScope();

  container
    .bind<Bot<MyContext>>(TOKENS.Grammy)
    .toDynamicValue((ctx) => {
      const config = ctx.get<ConfigPort>(TOKENS.ConfigPort);
      const token = config.get('BOT_TOKEN');
      return new Bot(token);
    })
    .inRequestScope();

  container.bind<TelegramBot>(TOKENS.TelegramBot).to(TelegramBot).inSingletonScope();

  return container;
};
