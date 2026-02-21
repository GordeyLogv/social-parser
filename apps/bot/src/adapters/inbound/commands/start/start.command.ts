import { inject, injectable } from 'inversify';
import { TOKENS } from '../../../../tokens';
import { LoggerPort } from '@app/core';
import { Bot, Context } from 'grammy';

@injectable()
export class StartCommand {
  public constructor(@inject(TOKENS.StartCommandLogger) private logger: LoggerPort) {
    this.logger.info('Loading succes');
  }

  public register(bot: Bot<Context>): void {
    bot.command('start', async (ctx) => {
      this.logger.info('Обработан');

      await ctx.reply('Привет!)');
    });
  }
}
