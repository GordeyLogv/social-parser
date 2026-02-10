import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { backKeyboard } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class TopAccountsCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:top_accounts', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${TopAccountsCallbackQuery.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      ctx.answerCallbackQuery();

      const accounts = '';

      ctx.editMessageText(accounts, { reply_markup: backKeyboard('ui:menu') });
    });
  }
}
