import { DomainError } from '../../../../shared';

import { FirstNameErrorCodes, FirstNameErrorMessages } from '../../messages';

export class FirstNameTooLongError extends DomainError {
  override code = FirstNameErrorCodes.FIRST_NAME_TOO_LONG;

  constructor() {
    super(FirstNameErrorMessages.FIRST_NAME_TOO_LONG);
  }
}
