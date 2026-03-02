import { ApplicationError } from '../../../shared';

import { AddAccountErrorCodes, AddAccountErrorMessages } from '../messages';

export class AccountFailedToSave extends ApplicationError {
  override code = AddAccountErrorCodes.FAILED_TO_SAVE;

  constructor() {
    super(AddAccountErrorMessages.FAILED_TO_SAVE);
  }
}
