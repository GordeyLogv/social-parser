import { InlineKeyboard } from 'grammy';

export const confirmAccountKeyboard = () => {
  return new InlineKeyboard()
    .text('✅ Да', 'ui:confirm_account:success')
    .row()
    .text('❌ Нет', 'ui:confirm_account:failed')
    .row();
};
