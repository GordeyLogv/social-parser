import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { backKeyboard, choosedPlatformMessage } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class ChoosedPlatformCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery(/^ui:add_account:(tiktok|instagram|youtube)$/, async (ctx) => {
      this.logger.info(`[CallbackQuery] ${ChoosedPlatformCallbackQuery.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      ctx.answerCallbackQuery();

      const platform = ctx.update.callback_query.data.split(':')[2];

      ctx.editMessageText(choosedPlatformMessage(platform), { reply_markup: backKeyboard('ui:add_account') });
    });
  }
}
