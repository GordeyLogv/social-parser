import { DomainError } from '../../../../shared';

import { AccountHandleErrorCodes, AccountHandleErrorMessages } from '../../messages/errors/handle';

export class AccountHandleToShortError extends DomainError {
  override code = AccountHandleErrorCodes.HANDLE_TO_SHORT;

  constructor() {
    super(AccountHandleErrorMessages.HANDLE_TO_SHORT);
  }
}
