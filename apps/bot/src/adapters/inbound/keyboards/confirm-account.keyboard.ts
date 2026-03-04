import { InlineKeyboard } from 'grammy';

export const confirmAccountKeyboard = () => {
  return new InlineKeyboard()
    .text('✅ Yes', 'ui:confirm_account:success')
    .row()
    .text('❌ Nope', 'ui:confirm_account:failed')
    .row();
};
