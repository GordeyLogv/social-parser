import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { backKeyboard, choosedPlatformMessage, platformsMapper, setSessionHelper } from '../../../../shared';

import { TYPES } from '../../../../types';

import { MyContext, PlatformsEnum, StepsEnum } from '../../context';

import { ICallbackQuery } from '../callback-query.interface';

@injectable()
export class ChoosedPlatformCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TYPES.LoggerPort) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery(/^ui:add_account:(Tiktok|Instagram|YouTube)$/, async (ctx) => {
      this.logger.info(`[CallbackQuery] ${ChoosedPlatformCallbackQuery.name} - start callbackQuery`, {
        userTelegramId: ctx.from.id,
        userFirstName: ctx.from.first_name,
      });

      await ctx.answerCallbackQuery();

      const platform = ctx.update.callback_query.data.split(':')[2];

      setSessionHelper(ctx, StepsEnum.WAITING_ACCOUNT_NICKNAME, platformsMapper(platform));

      await ctx.editMessageText(choosedPlatformMessage(platform), { reply_markup: backKeyboard('ui:add_account') });
    });
  }
}
