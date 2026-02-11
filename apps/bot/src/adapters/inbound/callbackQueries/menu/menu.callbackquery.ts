import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { menuKeyboard } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class MenuCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery('ui:menu', async (ctx) => {
      this.logger.info(`[CallbackQuery] ${MenuCallbackQuery.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      await ctx.answerCallbackQuery();

      await ctx.editMessageText('Меню', { reply_markup: menuKeyboard() });
    });
  }
}
