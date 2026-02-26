import { inject, injectable } from 'inversify';

import { Bot, Context } from 'grammy';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../../tokens';
import { UserApiPort } from '../../../outbound';
import { startMessage, ApiError } from '../../../../common';
import { menuKeyboard } from '../../keyboards';
import { ICommand } from '../command.interface';

@injectable()
export class StartCommand implements ICommand {
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

      try {
        await this.api.addUser(res);
        this.logger.info('Пользователь валидный', { user: { telegramId: res.telegramId, firstName: res.firstName } });
      } catch (error) {
        if (error instanceof ApiError) {
          this.logger.warn('Пользоватль невалидный', {
            user: { telegramId: res.telegramId, firstName: res.firstName },
            error: { code: error.code, message: error.message },
          });
        }
        throw error;
      }

      await ctx.reply(startMessage(res.firstName ?? 'Anonymous'), { reply_markup: menuKeyboard() });
    });
  }
}
