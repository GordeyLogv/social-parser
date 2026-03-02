import { ApplicationError } from '../../../../shared';

import { GetUserErrorCodes, GetUserErrorMessages } from '../../messages/get-user';

export class UserNotFoundError extends ApplicationError {
  override code = GetUserErrorCodes.USER_NOT_FOUND;

  constructor() {
    super(GetUserErrorMessages.USER_NOT_FOUND);
  }
}
