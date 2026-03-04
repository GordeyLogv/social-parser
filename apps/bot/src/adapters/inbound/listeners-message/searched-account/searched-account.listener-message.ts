import { inject, injectable } from 'inversify';

import { LoggerPort } from '@app/core';

import { IListerMessage } from '../listener-message.interface';
import { MyContext } from '../../../../context';
import { TOKENS } from '../../../../tokens';
import { ContextSteepEnum, setSessionHelper } from '../../../../common';
import { ServerApiPort } from '../../../outbound';
import { confirmAccountKeyboard } from '../../keyboards';

@injectable()
export class SearchedAccountListenerMessage implements IListerMessage {
  public constructor(
    @inject(TOKENS.SearchedAccountListenerMessageLogger) private readonly logger: LoggerPort,
    @inject(TOKENS.ServerApiPort) private readonly api: ServerApiPort,
  ) {}

  public async handle(ctx: MyContext): Promise<boolean> {
    if (ctx.session.step == ContextSteepEnum.IDLE && ctx.session.platform == undefined) {
      return false;
    }

    const handle = ctx.message!.text!;
    const platform = ctx.session.platform!;

    this.logger.info('Start', { telegramId: ctx.msg?.chat.id, handle });

    const { url } = await this.api.searchAccount({
      telegramId: String(ctx.msg?.chat.id),
      handle,
      platform,
    });

    await ctx.reply(`Найден аккаунт:\n${url}\nДобавить?`, { reply_markup: confirmAccountKeyboard() });

    setSessionHelper(ctx, ContextSteepEnum.CONFIRM_ADDED_ACCOUNT, platform, handle, url);

    return true;
  }
}
