import { Bot, Context } from 'grammy';

export interface ICommand {
  register: (bot: Bot<Context>) => void;
}
