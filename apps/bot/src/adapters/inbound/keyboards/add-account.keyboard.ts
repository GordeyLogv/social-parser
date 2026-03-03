import { InlineKeyboard } from 'grammy';

export const addAccountKeyboard = () => {
  return new InlineKeyboard()
    .text('⬅️ Назад', 'ui:menu')
    .row()
    .text('TikTok', 'ui:add_account:tiktok')
    .row()
    .text('Instagram', 'ui:add_account:instagram')
    .row()
    .text('YouTube', 'ui:add_account:youtube');
};
