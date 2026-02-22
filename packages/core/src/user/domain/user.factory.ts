import { UserEntity } from './user.entity';

import { IUserProps, IUserPropsFactory } from './user.types';

export class UserFactory {
  public static createNew(props: IUserPropsFactory): UserEntity {
    return UserEntity.createNew(props);
  }

  public static fromPersistence(props: IUserProps): UserEntity {
    return UserEntity.fromPersistence(props);
  }
}
