import { MyContext } from '../../../context';

export interface IListerMessage {
  handle: (ctx: MyContext) => Promise<boolean>;
}
