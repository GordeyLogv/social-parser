import { Bot, Context } from 'grammy';

export interface ICallbackQuery {
  register: (bot: Bot<Context>) => void;
}
