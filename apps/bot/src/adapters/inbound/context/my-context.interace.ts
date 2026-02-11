import { PlatformsEnum, StepsEnum } from './';

export interface IMyContext {
  step: StepsEnum;
  platform?: PlatformsEnum;
}
