import { DomainError } from '../../../../shared';

import { AccountHandleErrorCodes, AccountHandleErrorMessages } from '../../messages/errors/handle';

export class InvalidAccountHandleError extends DomainError {
  override code = AccountHandleErrorCodes.INVALID_HANDLE;

  constructor() {
    super(AccountHandleErrorMessages.INVALID_HANDLE);
  }
}
