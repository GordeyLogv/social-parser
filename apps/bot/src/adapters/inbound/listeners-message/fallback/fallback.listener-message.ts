import { inject, injectable } from 'inversify';

import { LoggerPort } from '@app/core';

import { IListerMessage } from '../listener-message.interface';
import { MyContext } from '../../../../context';
import { TOKENS } from '../../../../tokens';
import { ContextSteepEnum, fallbackListenerMessage } from '../../../../common';

@injectable()
export class FallbackListenerMessage implements IListerMessage {
  public constructor(@inject(TOKENS.FallbackListenerMessageLogger) private readonly logger: LoggerPort) {}

  public async handle(ctx: MyContext): Promise<boolean> {
    if (ctx.session.step == ContextSteepEnum.WAITING_ACCOUNT_HANDLE && ctx.session.platform != undefined) {
      return false;
    }

    this.logger.info('Start listener', { telegramId: ctx.msg?.chat.id });

    await ctx.reply(fallbackListenerMessage);

    return true;
  }
}
