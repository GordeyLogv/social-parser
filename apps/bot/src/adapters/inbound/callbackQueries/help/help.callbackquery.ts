import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { TYPES } from '../../../../types';

import { MyContext } from '../../context';

import { backKeyboard } from '../../../../shared';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class HelpCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:help', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${HelpCallbackQuery.name} - start calbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      await ctx.answerCallbackQuery();

      await ctx.editMessageText('Помощь', { reply_markup: backKeyboard('ui:menu') });
    });
  }
}
