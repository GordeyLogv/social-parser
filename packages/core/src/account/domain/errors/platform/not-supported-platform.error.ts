import { DomainError } from '../../../../shared';

import { AccountPlatformErrorCodes, AccountPlatformErrorMessages } from '../../messages/errors/platform';

export class AccountNotSupportedPlatformError extends DomainError {
  override code = AccountPlatformErrorCodes.NOT_SUPPORTED_PLATFORM;

  constructor() {
    super(AccountPlatformErrorMessages.NOT_SUPPORTED_PLATFORM);
  }
}
