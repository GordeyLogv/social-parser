import { UserEntity } from './user.entity';
import { IUserProps } from './user.types';

export class UserFactory {
  public static createNew(props: Omit<IUserProps, 'id'>): UserEntity {
    return UserEntity.createNew(props);
  }

  public static fromPersistence(props: IUserProps): UserEntity {
    return UserEntity.fromPersistence(props);
  }
}
