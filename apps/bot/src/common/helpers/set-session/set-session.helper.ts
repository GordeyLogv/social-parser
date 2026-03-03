import { AccountPlatformsEnum } from '@app/core';

import { MyContext } from '../../../context';
import { ContextSteepEnum } from '../../context';

export const setSessionHelper = (ctx: MyContext, step: ContextSteepEnum, platform?: AccountPlatformsEnum) => {
  ctx.session.step = step;
  ctx.session.platform = platform ? platform : undefined;
};
