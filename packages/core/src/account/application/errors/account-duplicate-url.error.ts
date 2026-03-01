import { ApplicationError } from '../../../shared';

import { AddAccountErrorCodes, AddAccountErrorMessages } from '../messages/add-account';

export class AccountDuplicateUrlError extends ApplicationError {
  override code = AddAccountErrorCodes.DUPLICATE_URL;

  constructor() {
    super(AddAccountErrorMessages.DUPLICATE_URL);
  }
}
