import { Context, SessionFlavor } from 'grammy';

import { IMyContext } from './';

export type MyContext = Context & SessionFlavor<IMyContext>;
