import { AccountNameInvalid, AccountNameLengthError } from '../errors/account';

export class AccountNamePolicy {
  public static validate(accountName: string): void {
    const firstSymbol = accountName[0];

    if (firstSymbol != '@') {
      throw new AccountNameInvalid();
    }

    const duplicateFirstSymbol = accountName.replace(/[^@]/g, '').length;

    if (duplicateFirstSymbol >= 2) {
      throw new AccountNameInvalid();
    }

    if (accountName.length < 3) {
      throw new AccountNameLengthError();
    }
  }
}
