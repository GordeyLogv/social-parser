import { DomainError } from '../../../../shared';

import { AccountHandleErrorCodes, AccountHandleErrorMessages } from '../../messages/errors/handle';

export class AccountHandleToLongError extends DomainError {
  override code = AccountHandleErrorCodes.HANDLE_TO_LONG;

  constructor() {
    super(AccountHandleErrorMessages.HANDLE_TO_LONG);
  }
}
