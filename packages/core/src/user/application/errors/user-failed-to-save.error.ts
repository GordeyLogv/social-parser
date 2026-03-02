import { ApplicationError } from '../../../shared';

import { AddUserErrorMessages } from '../messages';

export class UserFailedToSave extends ApplicationError {
  override code = AddUserErrorMessages.USER_FAILED_TO_SAVE;

  constructor() {
    super(AddUserErrorMessages.USER_FAILED_TO_SAVE);
  }
}
