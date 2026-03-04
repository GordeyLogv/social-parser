import { inject, injectable } from 'inversify';

import { Bot } from 'grammy';

import { AccountPlatformsEnum, LoggerPort } from '@app/core';

import { ICallbackQuery } from '../callback-query.interface';
import { MyContext } from '../../../../context';
import { TOKENS } from '../../../../tokens';
import { ServerApiPort } from '../../../outbound';
import {
  confirmAccountFailedMessage,
  confirmAccountSuccessMessage,
  ContextSteepEnum,
  setSessionHelper,
} from '../../../../common';
import { addAccountKeyboard, menuKeyboard } from '../../keyboards';

@injectable()
export class ConfirmAccountCallbackQuery implements ICallbackQuery {
  public constructor(
    @inject(TOKENS.ConfirmAccountCallbackQueryLogger) private readonly logger: LoggerPort,
    @inject(TOKENS.ServerApiPort) private readonly api: ServerApiPort,
  ) {}

  public register(bot: Bot<MyContext>): void {
    bot.callbackQuery(/^ui:confirm_account:(success|failed)$/, async (ctx) => {
      this.logger.info('Start callback');
      const provider = ctx.match?.[1];

      const sessionData = {
        telegramId: String(ctx.msg!.chat.id),
        platform: ctx.session.platform!,
        handle: ctx.session.handle!,
        url: ctx.session.accountUrl!,
      };

      return provider === 'success'
        ? await this.success(ctx, sessionData)
        : await this.failed(ctx, sessionData.telegramId, sessionData.url);
    });
  }

  private async success(
    ctx: MyContext,
    input: { telegramId: string; platform: AccountPlatformsEnum; handle: string; url: string },
  ): Promise<void> {
    await ctx.answerCallbackQuery();

    this.logger.info('User confirm account', { telegramId: ctx.msg?.chat.id, accountUrl: input.url });

    await this.api.confirmAccount(input);

    setSessionHelper(ctx, ContextSteepEnum.IDLE);

    await ctx.editMessageText(confirmAccountSuccessMessage(input.url), { reply_markup: menuKeyboard() });
  }

  private async failed(ctx: MyContext, telegramId: string, accountUrl: string): Promise<void> {
    await ctx.answerCallbackQuery();

    this.logger.info('User not confirm account', { telegramId, accountUrl });

    setSessionHelper(ctx, ContextSteepEnum.IDLE);

    await ctx.editMessageText(confirmAccountFailedMessage(accountUrl), { reply_markup: addAccountKeyboard() });
  }
}
