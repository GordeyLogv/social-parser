import { inject, injectable } from 'inversify';
import { ICallbackQuery } from '../callback-query.interface';
import { TOKENS } from '../../../../tokens';
import { LoggerPort } from '@app/core';
import { Bot, Context } from 'grammy';
import { addAccountMessage } from '../../../../common';
import { addAccountKeyboard } from '../../keyboards';

@injectable()
export class AddAccountCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TOKENS.AddAccountCallbackQueryLogger) private readonly logger: LoggerPort) {}

  public register(bot: Bot<Context>): void {
    bot.callbackQuery('ui:add_account', async (ctx) => {
      this.logger.info('Start', { telegramId: ctx.msg?.chat.id });

      await ctx.answerCallbackQuery();

      await ctx.editMessageText(addAccountMessage, { reply_markup: addAccountKeyboard() });
    });
  }
}
