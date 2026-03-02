import { IUserPropsPrimitives } from '../../domain';

export interface UserRepositoryPort {
  findUser: (telegramId: bigint) => Promise<IUserPropsPrimitives | null>;

  save: (userProps: IUserPropsPrimitives) => Promise<void>;
}
