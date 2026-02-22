import { inject, injectable } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../../tokens';
import { UserApiPort } from '../../../outbound';

@injectable()
export class StartCommand {
  public constructor(
    @inject(TOKENS.StartCommandLogger) private logger: LoggerPort,
    @inject(TOKENS.UserApiPort) private readonly api: UserApiPort,
  ) {
    this.logger.info('Loading succes');
  }

  public register(bot: Bot<Context>): void {
    bot.command('start', async (ctx) => {
      const res = {
        telegramId: String(ctx.msg.chat.id),
        firstName: ctx.msg.chat.first_name,
      };
      await this.api.addUser(res);

      this.logger.info(`TelegramId: ${res.telegramId}, firstName: ${res.firstName}`);

      await ctx.reply('Привте');
    });
  }
}
