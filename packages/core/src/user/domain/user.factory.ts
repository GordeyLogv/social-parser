import { UserEntity } from './user.entity';

import { IUserPropsFactory, IUserPropsPrimitives } from './user.types';

export class UserFactory {
  public static createNew(props: IUserPropsFactory): UserEntity {
    return UserEntity.createNew(props);
  }

  public static fromPersistence(props: IUserPropsPrimitives): UserEntity {
    return UserEntity.fromPersistence(props);
  }
}
