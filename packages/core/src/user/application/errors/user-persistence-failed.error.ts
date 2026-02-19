import { ApplicationError } from '../../../shared';

import { AddUserErrorCodes, AddUserErrorMessages } from '../messages';

export class UserPersistenceFailedError extends ApplicationError {
  override code = AddUserErrorCodes.USER_PERSISTENCE_FAILED;

  constructor() {
    super(AddUserErrorMessages.USER_PERSISTENCE_FAILED);
  }
}
