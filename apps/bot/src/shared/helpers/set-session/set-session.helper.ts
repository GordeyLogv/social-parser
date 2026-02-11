import { MyContext, PlatformsEnum, StepsEnum } from '../../../adapters/inbound';

export const setSessionHelper = (ctx: MyContext, step: StepsEnum, platform?: PlatformsEnum) => {
  ctx.session.step = step;
  ctx.session.platform = platform ? platform : undefined;
};
