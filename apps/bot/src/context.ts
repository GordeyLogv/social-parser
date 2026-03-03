import { Context, SessionFlavor } from 'grammy';

import { SessionData } from './common/context';

export type MyContext = Context & SessionFlavor<SessionData>;
