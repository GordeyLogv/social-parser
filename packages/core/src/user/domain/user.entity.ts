import { IUserProps } from './user.types';

export class User {
  private readonly _telegramId: number;
  private readonly _firstName: string;

  private constructor(props: IUserProps) {
    this._telegramId = props.telegramId;
    this._firstName = props.firstName;
  }

  public static create(props: IUserProps): User {
    return new User(props);
  }

  public get telegramId(): number {
    return this._telegramId;
  }

  public get firstName(): string {
    return this._firstName;
  }
}
