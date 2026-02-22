import { FirstNameVO, TelegramIdVO } from './value-objects';

export interface IUserProps {
  id?: number;
  telegramId: TelegramIdVO;
  firstName: FirstNameVO;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPropsFactory {
  telegramId: string;
  firstName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPropsPrimitives {
  id?: number;
  telegramId: bigint;
  firstName: string;
  createdAt: Date;
  updatedAt: Date;
}
