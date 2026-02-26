import { inject, injectable } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { ICallbackQuery } from '../callback-query.interface';
import { TOKENS } from '../../../../tokens';
import { helpMessage } from '../../../../common';
import { backKeyboard } from '../../keyboards';

@injectable()
export class HelpCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TOKENS.HelpCallbackQueryLogger) private readonly logger: LoggerPort) {}

  public register(bot: Bot<Context>): void {
    bot.callbackQuery('ui:help', async (ctx) => {
      this.logger.info('Start', { user: { telegramId: ctx.msg?.chat.id } });

      await ctx.answerCallbackQuery();

      await ctx.editMessageText(helpMessage, { reply_markup: backKeyboard('ui:menu') });
    });
  }
}
