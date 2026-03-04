import { Container } from 'inversify';

import express, { Express } from 'express';

import { ConfigPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';

import { ConfigAdapter, LoggerAdapter } from '../adapters/outbound';
import { TOKENS } from '../tokens';
import { Parser } from '../app';

export const initContainer = () => {
  const container = new Container();

  // Adapters
  container
    .bind<LoggerPort>(TOKENS.LoggerPort)
    .toDynamicValue(() => new LoggerAdapter(LoggerAppEnum.PARSER, LoggerHandleEnum.ADAPTER, LoggerAdapter.name));
  container.bind<ConfigPort>(TOKENS.ConfigPort).to(ConfigAdapter).inSingletonScope();

  // Logging
  container
    .bind<LoggerPort>(TOKENS.ConfigLogging)
    .toDynamicValue((ctx) => ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandleName(ConfigAdapter.name));

  container
    .bind<LoggerPort>(TOKENS.ParserLogging)
    .toDynamicValue((ctx) =>
      ctx.get<LoggerPort>(TOKENS.LoggerPort).withHandle(LoggerHandleEnum.APP).withHandleName(Parser.name),
    );

  container
    .bind<Express>(TOKENS.Express)
    .toDynamicValue((ctx) => {
      const app = express();
      return app;
    })
    .inSingletonScope();

  container.bind<Parser>(TOKENS.Parser).to(Parser);

  return container;
};
