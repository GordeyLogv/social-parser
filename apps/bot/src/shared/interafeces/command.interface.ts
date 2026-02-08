import { Bot } from 'grammy';

import { MyContext } from '../../adapters/inbound';

export interface ICommand {
  register: (bot: Bot<MyContext>) => void;
}
