import { ApplicationError } from '@shared';
import { GetAccountsErrorCodes, GetAccountsErrorMessages } from '../../messages';

export class NotFoundAccountsError extends ApplicationError {
  override code = GetAccountsErrorCodes.NOT_FOUND;

  public constructor() {
    super(GetAccountsErrorMessages.NOT_FOUND);
  }
}
