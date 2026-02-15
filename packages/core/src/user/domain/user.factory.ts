import { User } from './user.entity';

export class UserFactory {
  public static newUser(props: { telegramId: number; firstName: string }): User {
    return User.create(props);
  }

  public static persistenceUser(props: { telegramId: number; firstName: string }): User {
    return User.create(props);
  }
}
