import { DomainError } from '@shared';

import { AccountNameErrorCodes, AccountNameErrorMessages } from '../../messages/errors/account';

export class AccountNameInvalid extends DomainError {
  override code = AccountNameErrorCodes.ACCOUNT_NAME_INVALID;

  public constructor() {
    super(AccountNameErrorMessages.ACCOUNT_NAME_INVALID);
  }
}
