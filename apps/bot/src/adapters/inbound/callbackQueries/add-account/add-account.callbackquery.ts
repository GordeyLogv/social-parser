import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { addAccountKeyboard, addAccountMessage } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class AddAccountCallbackQuey implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:add_account', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${AddAccountCallbackQuey.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      ctx.answerCallbackQuery();

      ctx.editMessageText(addAccountMessage, { reply_markup: addAccountKeyboard() });
    });
  }
}
