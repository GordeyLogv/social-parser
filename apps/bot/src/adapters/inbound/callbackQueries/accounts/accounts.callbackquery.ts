import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TYPES } from '../../../../types';

import { backKeyboard } from '../../../../shared';

import { MyContext } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class AccountsCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:my_accounts', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${AccountsCallbackQuery.name} - start calbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      await ctx.answerCallbackQuery();

      const accounts = 'Мои аккаунты';

      await ctx.editMessageText(accounts, { reply_markup: backKeyboard('ui:menu') });
    });
  }
}
