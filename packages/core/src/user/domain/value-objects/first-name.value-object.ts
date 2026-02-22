import { FirstNameTooLongError, FirstNameTooShortError } from '../errors/first-name';

export class FirstNameVO {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value?: string): FirstNameVO {
    const trimmed = value ? value.trim() : 'Anonymous';

    const normalized = trimmed.length < 1 ? 'Anonymous' : trimmed;

    if (normalized.length < 2) {
      throw new FirstNameTooShortError();
    }

    if (normalized.length > 65) {
      throw new FirstNameTooLongError();
    }

    return new FirstNameVO(normalized);
  }

  public get value(): string {
    return this._value;
  }
}
