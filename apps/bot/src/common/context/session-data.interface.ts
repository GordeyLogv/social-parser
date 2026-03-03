import { AccountPlatformsEnum } from '@app/core';

import { ContextSteepEnum } from './context-steep.enum';

export interface SessionData {
  step: ContextSteepEnum;
  platform?: AccountPlatformsEnum;
}
