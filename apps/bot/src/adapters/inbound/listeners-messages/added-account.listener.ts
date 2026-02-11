import { inject, injectable } from 'inversify';

import { LoggerPort } from '@app/core';

import { IListenerMessage } from './listener-message.interface';

import { TYPES } from '../../../types';

import { MyContext, StepsEnum } from '../context';

import { addedAccountListenerMessage } from '../../../shared/messages/listeners';

import { setSessionHelper } from '../../../shared';

@injectable()
export class AddedAccountListener implements IListenerMessage {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public async handle(ctx: MyContext): Promise<boolean> {
    let result: boolean = false;

    if (ctx.session.step == StepsEnum.WAITING_ACCOUNT_NICKNAME && ctx.session.platform != undefined) {
      this.logger.info(`[Listener] ${AddedAccountListener.name} - start listener`, {
        userTelegramId: ctx.from?.id,
        userFirstName: ctx.from?.first_name,
      });

      await ctx.reply(addedAccountListenerMessage(ctx.session.platform, ctx.message?.text ?? ''));

      setSessionHelper(ctx, StepsEnum.IDLE);

      result = true;
    }

    return result;
  }
}
