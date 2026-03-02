import { TelegramIdInvalidError } from '../errors';

export class TelegramIdVO {
  private readonly _value: bigint;

  private constructor(value: bigint) {
    this._value = value;
  }

  public static create(value: string): TelegramIdVO {
    const trimmed = value.trim();

    if (trimmed === '') {
      throw new TelegramIdInvalidError();
    }

    let parsed: bigint;
    try {
      parsed = BigInt(trimmed);
    } catch {
      throw new TelegramIdInvalidError();
    }

    return new TelegramIdVO(parsed);
  }

  public static persistence(value: bigint): TelegramIdVO {
    return new TelegramIdVO(value);
  }

  public get value(): bigint {
    return this._value;
  }
}
