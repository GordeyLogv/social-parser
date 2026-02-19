import { IUserProps } from './user.types';

export class UserEntity {
  private readonly _id?: number;
  private readonly _telegramId: bigint;
  private _firstName: string;
  private readonly createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: IUserProps) {
    this._id = props.id;
    this._telegramId = props.telegramId;
    this._firstName = props.firstName;
    this.createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static createNew(props: Omit<IUserProps, 'id'>): UserEntity {
    return new UserEntity(props);
  }

  public static fromPersistence(props: IUserProps): UserEntity {
    return new UserEntity(props);
  }

  public toProps(): IUserProps {
    return {
      id: this._id,
      telegramId: this._telegramId,
      firstName: this._firstName,
      createdAt: this.createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
