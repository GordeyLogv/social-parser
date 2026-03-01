import { InvalidAccountHandleError, AccountHandleToLongError, AccountHandleToShortError } from '../errors/handle';

export class AccountHandleVO {
  private readonly _handle: string;

  private constructor(handle: string) {
    this._handle = handle;
  }

  public static create(raw: string): AccountHandleVO {
    const trimed = raw.trim();

    if (!trimed || trimed.length == 0) {
      throw new InvalidAccountHandleError();
    }

    const normalized = trimed.startsWith('@') ? trimed.slice(1) : trimed;

    if (normalized.length < 3) {
      throw new AccountHandleToShortError();
    } else if (normalized.length > 65) {
      throw new AccountHandleToLongError();
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(normalized)) {
      throw new InvalidAccountHandleError();
    }

    return new AccountHandleVO(normalized);
  }

  public get handle(): string {
    return this._handle;
  }

  public get displayName(): string {
    return `@${this._handle}`;
  }
}
