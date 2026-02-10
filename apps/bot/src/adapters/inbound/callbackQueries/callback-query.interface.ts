import { Bot } from 'grammy';

import { MyContext } from '../context';

export interface ICallbackQuery {
  register: (bot: Bot<MyContext>) => void;
}
