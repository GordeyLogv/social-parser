import { ApplicationError } from '../../../shared';

import { AddUserErrorCodes, AddUserErrorMessages } from '../messages';

export class UserAlreadyExistsError extends ApplicationError {
  override code = AddUserErrorCodes.USER_ALREADY_EXISTS;

  constructor() {
    super(AddUserErrorMessages.USER_ALREADY_EXISTS);
  }
}
