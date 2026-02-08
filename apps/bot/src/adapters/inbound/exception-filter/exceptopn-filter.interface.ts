import { MyContext } from '../context';

export interface ExceptionFilterInfrastructurePort {
  handle: (error: unknown, ctx: MyContext) => Promise<void>;
}
