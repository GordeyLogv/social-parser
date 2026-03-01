import { DomainError } from '../../../../shared';

import { AccountPlatformErrorCodes, AccountPlatformErrorMessages } from '../../messages/errors/platform';

export class AccountInvalidPlatformError extends DomainError {
  override code = AccountPlatformErrorCodes.INVALID_PLATFORM;

  constructor() {
    super(AccountPlatformErrorMessages.INVALID_PLATFORM);
  }
}
