import { AccountPlatformEnum } from '@app/core';

import { StepsEnum } from './';

export interface IMyContext {
  step: StepsEnum;
  platform?: AccountPlatformEnum;
}
