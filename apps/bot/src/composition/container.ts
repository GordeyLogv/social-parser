import { Container } from 'inversify';
import { Bot } from 'grammy';

import { AccountRepositoryPort, ConfigPort, GetAccountsUseCase, LoggerPort, UserGreetingUseCase } from '@app/core';

import {
  AccountsCallbackQuery,
  AddAccountCallbackQuery,
  ExceptionFilterAdapter,
  ExceptionFilterInfrastructurePort,
  HelpCallbackQuery,
  ICallbackQuery,
  ICommand,
  MenuCallbackQuery,
  MyContext,
  StartCommand,
  TopAccountsCallbackQuery,
  ChoosedPlatformCallbackQuery,
  SessionMiddleware,
  IListenerMessage,
  FallbackMessageListener,
  AddedAccountListener,
} from '../adapters/inbound';

import { LoggerAdapter, ConfigAdapter, HttpAccountRepositoryAdapter } from '../adapters/outbound';

import { TYPES } from '../types';

import { TelegramBot } from '../app';

import { CommandRegistryHelper, CallbackQueryRegistryHelper, ListerMessageRegistryHelper } from '../shared';

export const initContainer = (): Container => {
  const container = new Container();

  // Adapters
  container.bind<LoggerPort>(TYPES.LoggerPort).to(LoggerAdapter).inSingletonScope();
  container.bind<ConfigPort>(TYPES.ConfigPort).to(ConfigAdapter).inSingletonScope();
  container.bind<ExceptionFilterInfrastructurePort>(TYPES.ExceptionFilterPort).to(ExceptionFilterAdapter).inSingletonScope();
  container.bind<AccountRepositoryPort>(TYPES.AccountRepositoryPort).to(HttpAccountRepositoryAdapter).inSingletonScope();

  // Use-cases
  container
    .bind<UserGreetingUseCase>(TYPES.UserGreetingUseCase)
    .toDynamicValue((ctx) => {
      const logger = ctx.get<LoggerPort>(TYPES.LoggerPort);
      return new UserGreetingUseCase(logger);
    })
    .inSingletonScope();
  container
    .bind<GetAccountsUseCase>(TYPES.GetAccountsUseCase)
    .toDynamicValue((ctx) => {
      const logger = ctx.get<LoggerPort>(TYPES.LoggerPort);
      const accountRepository = ctx.get<AccountRepositoryPort>(TYPES.AccountRepositoryPort);
      return new GetAccountsUseCase(logger, accountRepository);
    })
    .inSingletonScope();

  // Commands
  container.bind<ICommand>(TYPES.ICommand).to(StartCommand).inSingletonScope();
  container.bind<CommandRegistryHelper>(TYPES.CommandsRegistryHelper).to(CommandRegistryHelper).inSingletonScope();

  // CallbackQueries
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(MenuCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(HelpCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(AccountsCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(AddAccountCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(ChoosedPlatformCallbackQuery).inSingletonScope();
  container.bind<ICallbackQuery>(TYPES.ICallbackQuery).to(TopAccountsCallbackQuery).inSingletonScope();
  container
    .bind<CallbackQueryRegistryHelper>(TYPES.CallbackQueryRegistryHelper)
    .to(CallbackQueryRegistryHelper)
    .inSingletonScope();

  // Middlewares
  container.bind<SessionMiddleware>(TYPES.SessionMiddleware).to(SessionMiddleware).inSingletonScope();

  // Listeners
  container.bind<IListenerMessage>(TYPES.IListenerMessage).to(FallbackMessageListener).inSingletonScope();
  container.bind<IListenerMessage>(TYPES.IListenerMessage).to(AddedAccountListener).inSingletonScope();
  container
    .bind<ListerMessageRegistryHelper>(TYPES.ListerMessageRegistryHelper)
    .to(ListerMessageRegistryHelper)
    .inSingletonScope();

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
