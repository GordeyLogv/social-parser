import { UserEntity } from '../domain';

export interface GetUserInput {
  telegramId: string;
}

export interface GetUserOutput {
  user: UserEntity;
}
