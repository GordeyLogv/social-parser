import { MyContext } from '../context';

export interface ExceptionFilterPort {
  handle: (error: unknown, ctx: MyContext) => Promise<void>;
}
