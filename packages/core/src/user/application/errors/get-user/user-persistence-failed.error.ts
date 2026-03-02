import { ApplicationError } from '../../../../shared';

import { GetUserErrorCodes, GetUserErrorMessages } from '../../messages/get-user';

export class UserPersistenceFailedError extends ApplicationError {
  override code = GetUserErrorCodes.USER_PERSISTENCE_FAILED;

  constructor() {
    super(GetUserErrorMessages.USER_PERSISTENCE_FAILED);
  }
}
