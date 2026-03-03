import { inject, injectable, multiInject } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { IMiddleware } from '../../../adapters';
import { MyContext } from '../../../context';

@injectable()
export class MiddlewaresRegistryHelper {
  public constructor(
    @inject(TOKENS.MiddlewaresRegistryLogger) private readonly logger: LoggerPort,
    @multiInject(TOKENS.IMiddleware) private readonly middlewares: IMiddleware[],
  ) {}

  public registryAllMiddlewares(bot: Bot<MyContext>): void {
    for (const middleware of this.middlewares) {
      this.logger.info(`${middleware.constructor.name} - loading success`);

      middleware.register(bot);
    }
  }
}
