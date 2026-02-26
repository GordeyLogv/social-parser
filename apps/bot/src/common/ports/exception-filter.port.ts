import { Context } from 'grammy';

export interface ExceptionFilterPort {
  handle: (error: unknown, ctx: Context) => Promise<void>;
}
