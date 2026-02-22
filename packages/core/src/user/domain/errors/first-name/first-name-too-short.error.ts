import { DomainError } from '../../../../shared';

import { FirstNameErrorCodes, FirstNameErrorMessages } from '../../messages';

export class FirstNameTooShortError extends DomainError {
  override code = FirstNameErrorCodes.FIRST_NAME_TOO_SHORT;

  constructor() {
    super(FirstNameErrorMessages.FIRST_NAME_TOO_SHORT);
  }
}
