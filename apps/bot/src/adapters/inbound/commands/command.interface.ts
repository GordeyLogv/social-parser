import { Bot } from 'grammy';

import { MyContext } from '../context';

export interface ICommand {
  register: (bot: Bot<MyContext>) => void;
}
