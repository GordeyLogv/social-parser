import { InlineKeyboard } from 'grammy';

export const menuKeyboard = () => {
  return new InlineKeyboard()
    .text('‼️ Help', 'ui:help')
    .row()
    .text('🔎 My accounts', 'ui:my_accounts')
    .row()
    .text('⚒️ Add account', 'ui:add_account')
    .row()
    .text('⚖️ Top 10', 'ui:top_accounts');
};
