import { AccountPlatformsEnum } from '@app/core';

import { MyContext } from '../../../context';
import { ContextSteepEnum } from '../../context';

export const setSessionHelper = (
  ctx: MyContext,
  step: ContextSteepEnum,
  platform?: AccountPlatformsEnum,
  handle?: string,
  url?: string,
) => {
  ctx.session.step = step;
  ctx.session.platform = platform ? platform : undefined;
  ctx.session.handle = handle ? handle : undefined;
  ctx.session.accountUrl = url ? url : undefined;
};
