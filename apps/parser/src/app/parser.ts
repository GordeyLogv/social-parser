import { inject, injectable } from 'inversify';

import { Express } from 'express';

import { ConfigPort, LoggerPort } from '@app/core';

import { TOKENS } from '../tokens';

@injectable()
export class Parser {
  public constructor(
    @inject(TOKENS.Express) private readonly app: Express,

    @inject(TOKENS.ParserLogging) private readonly logger: LoggerPort,
    @inject(TOKENS.ConfigPort) private readonly config: ConfigPort,
  ) {}

  private registerMiddlewares() {}

  private registerRoutes() {}

  private registerExceptionFilter() {}

  public init() {
    this.registerExceptionFilter();
    this.registerMiddlewares();
    this.registerRoutes();

    this.app.listen(this.config.get('PORT'), () => this.logger.info('Parser init'));
  }
}
