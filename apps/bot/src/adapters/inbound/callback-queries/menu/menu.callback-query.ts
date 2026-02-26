import { inject, injectable } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { ICallbackQuery } from '../callback-query.interface';
import { TOKENS } from '../../../../tokens';
import { startMessage } from '../../../../common';
import { menuKeyboard } from '../../keyboards';

@injectable()
export class MenuCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TOKENS.MenuCallbackQueryLogger) private readonly logger: LoggerPort) {}

  public register(bot: Bot<Context>): void {
    bot.callbackQuery('ui:menu', async (ctx) => {
      this.logger.info('Start', { user: { telegramId: ctx.msg?.chat.id } });

      await ctx.answerCallbackQuery();

      await ctx.editMessageText(startMessage(ctx.msg?.chat.first_name ?? 'Anonymous'), { reply_markup: menuKeyboard() });
    });
  }
}
