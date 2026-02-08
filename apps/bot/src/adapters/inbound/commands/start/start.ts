import { inject, injectable } from 'inversify';
import { Bot } from 'grammy';

import { LoggerPort, UserGreetingInput, UserGreetingUseCase } from '@app/core';

import { MyContext } from '../../context';

import { TYPES } from '../../../../types';

import { ICommand, menuKeyboard } from '../../../../shared';

@injectable()
export class StartCommand implements ICommand {
  public constructor(
    @inject(TYPES.LoggerPort) private readonly logger: LoggerPort,
    @inject(TYPES.UserGreetingUseCase) private readonly useCase: UserGreetingUseCase,
  ) {}

  public register(bot: Bot<MyContext>): void {
    bot.command('start', async (ctx) => {
      const res: UserGreetingInput = {
        userTelegramId: ctx.from?.id ?? 0,
        userFirstName: ctx.from?.first_name ?? '',
      };

      this.logger.info(`[Command] Start - start`, { userTelegramId: ctx.from?.id, userFirstName: ctx.from?.first_name });

      await ctx.reply(this.useCase.execute(res).greetingMessage, { reply_markup: menuKeyboard() });
    });
  }
}
