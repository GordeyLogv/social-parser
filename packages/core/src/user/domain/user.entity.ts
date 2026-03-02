import { IUserProps, IUserPropsFactory, IUserPropsPrimitives } from './user.types';

import { FirstNameVO, TelegramIdVO } from './value-objects';

export class UserEntity {
  private readonly _id?: number;
  private readonly _telegramId: TelegramIdVO;
  private _firstName: FirstNameVO;
  private readonly createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: IUserProps) {
    this._id = props.id;
    this._telegramId = props.telegramId;
    this._firstName = props.firstName;
    this.createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static createNew(props: IUserPropsFactory): UserEntity {
    return new UserEntity({
      telegramId: TelegramIdVO.create(props.telegramId),
      firstName: FirstNameVO.create(props.firstName),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  public static fromPersistence(props: IUserPropsPrimitives): UserEntity {
    return new UserEntity({
      id: props.id,
      telegramId: TelegramIdVO.persistence(props.telegramId),
      firstName: FirstNameVO.create(props.firstName),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
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

  public toPrimitives(): IUserPropsPrimitives {
    return {
      id: this._id,
      telegramId: this._telegramId.value,
      firstName: this._firstName.value,
      createdAt: this.createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
