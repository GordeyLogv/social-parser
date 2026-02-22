import { DomainError } from '../../../../shared';

import { TelegramIdCodesError, TelegramIdMessagesError } from '../../messages';

export class TelegramIdInvalidError extends DomainError {
  override code = TelegramIdCodesError.INVALID_TELEGRAM_ID;

  constructor() {
    super(TelegramIdMessagesError.INVALID_TELEGRAM_ID);
  }
}
