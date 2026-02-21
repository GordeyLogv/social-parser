import { ConfigPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';
import { Container } from 'inversify';
import { TOKENS } from '../tokens';
import { ConfigAdapter, LoggerAdapter } from '../adapters/outbound';
import { Bot, Context } from 'grammy';
import { TelegramBot } from '../app/telegram-bot';

export const initContainer = (): Container => {
  const container = new Container();

  container
    .bind<LoggerPort>(TOKENS.LoggerPort)
    .toDynamicValue(() => {
      return new LoggerAdapter(LoggerAppEnum.BOT, LoggerHandleEnum.ADAPTER);
    })
    .inSingletonScope();
  container.bind<ConfigPort>(TOKENS.ConfigPort).to(ConfigAdapter).inSingletonScope();

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
