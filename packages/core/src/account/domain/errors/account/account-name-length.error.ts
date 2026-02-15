import { DomainError } from '@shared';

import { AccountNameLengthErrorCodes, AccountNameLengthErrorMessages } from '../../messages/errors/account';

export class AccountNameLengthError extends DomainError {
  override code = AccountNameLengthErrorCodes.ACCOUNT_NAME_LENGTH_INVALID;

  public constructor() {
    super(AccountNameLengthErrorMessages.ACCOUNT_NAME_LENGTH_INVALID);
  }
}
