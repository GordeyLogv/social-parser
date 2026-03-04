import { inject, injectable } from 'inversify';

import { Bot } from 'grammy';

import { LoggerPort } from '@app/core';

import { ICallbackQuery } from '../callback-query.interface';
import { MyContext } from '../../../../context';
import { TOKENS } from '../../../../tokens';
import { choosedPlatformMessage, ContextSteepEnum, mapperPlatform, setSessionHelper } from '../../../../common';
import { backKeyboard } from '../../keyboards';

@injectable()
export class ChoosedPlatformCallbackQuery implements ICallbackQuery {
  public constructor(@inject(TOKENS.ChoosedPlatformCallbackQueryLogger) private readonly logger: LoggerPort) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery(/^ui:add_account:(tiktok|youtube)$/, async (ctx) => {
      const provider = ctx.match?.[1];

      const platform = mapperPlatform(provider);

      this.logger.info('Start calback', { telegramId: ctx.msg?.chat.id, platform });

      await ctx.answerCallbackQuery();

      setSessionHelper(ctx, ContextSteepEnum.WAITING_ACCOUNT_HANDLE, platform);

      await ctx.editMessageText(choosedPlatformMessage(platform), { reply_markup: backKeyboard('ui:add_account') });
    });
  }
}
