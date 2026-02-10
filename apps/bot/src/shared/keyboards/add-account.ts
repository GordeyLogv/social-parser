import { InlineKeyboard } from 'grammy';

export const addAccountKeyboard = () => {
  return new InlineKeyboard()
    .text('TikTok', 'ui:add_account:Tiktok')
    .row()
    .text('Instagram', 'ui:add_account:Instagram')
    .row()
    .text('YouTube', 'ui:add_account:Youtube')
    .row()
    .text('⬅️ Назад', 'ui:home');
};
