import { ConfigPort, LoggerPort } from '@app/core';
import { Container } from 'inversify';
import { TYPES } from '../types';
import { LoggerAdapter } from '../adapters/outbound/logger';
import { ConfigAdapter } from '../adapters/outbound/config/config.adapter';
import { Bot } from 'grammy';
import { MyContext } from '../adapters/inbound';
import { TelegramBot } from '../app';

export const initContainer = () => {
  const container = new Container();

  container.bind<LoggerPort>(TYPES.LoggerPort).to(LoggerAdapter).inSingletonScope();
  container.bind<ConfigPort>(TYPES.ConfigPort).to(ConfigAdapter).inSingletonScope();

  container.bind<Bot<MyContext>>(TYPES.Grammy).toDynamicValue((ctx) => {
    const config = ctx.get<ConfigPort>(TYPES.ConfigPort);
    const token = config.get('BOT_TOKEN');

    return new Bot(token);
  });

  container.bind<TelegramBot>(TYPES.TelegramBot).to(TelegramBot).inSingletonScope();

  return container;
};
