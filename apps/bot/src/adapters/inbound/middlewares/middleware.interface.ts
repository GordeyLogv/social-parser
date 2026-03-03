import { Bot } from 'grammy';

import { MyContext } from '../../../context';

export interface IMiddleware {
  register: (bot: Bot<MyContext>) => void;
}
