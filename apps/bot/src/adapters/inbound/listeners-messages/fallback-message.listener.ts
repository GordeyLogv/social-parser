import { inject, injectable } from 'inversify';

import { LoggerPort } from '@app/core';

import { IListenerMessage } from './listener-message.interface';

import { TYPES } from '../../../types';

import { MyContext, StepsEnum } from '../context';

import { fallbackListenerMessage } from '../../../shared/messages/listeners';

@injectable()
export class FallbackMessageListener implements IListenerMessage {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public async handle(ctx: MyContext): Promise<boolean> {
    let result: boolean = false;

    if (ctx.session.step != StepsEnum.WAITING_ACCOUNT_NICKNAME && ctx.session.platform == undefined) {
      this.logger.info(`[Listener] ${FallbackMessageListener.name} - start listener`, {
        userTelegramId: ctx.from?.id,
        userFirstName: ctx.from?.first_name,
      });

      await ctx.reply(fallbackListenerMessage);

      result = true;
    }

    return result;
  }
}
