import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { addAccountKeyboard, addAccountMessage, setSessionHelper } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext, StepsEnum } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class AddAccountCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:add_account', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${AddAccountCallbackQuery.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      await ctx.answerCallbackQuery();

      if (ctx.session.step != StepsEnum.IDLE && ctx.session.platform != undefined) {
        setSessionHelper(ctx, StepsEnum.IDLE);
      }

      await ctx.editMessageText(addAccountMessage, { reply_markup: addAccountKeyboard() });
    });
  }
}
