import { MyContext } from '../context';

export interface IListenerMessage {
  handle: (ctx: MyContext) => Promise<boolean>;
}
