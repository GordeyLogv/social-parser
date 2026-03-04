import { InlineKeyboard } from 'grammy';

export const addAccountKeyboard = () => {
  return new InlineKeyboard()
    .text('⬅️ Back', 'ui:menu')
    .row()
    .text('TikTok', 'ui:add_account:tiktok')
    .row()
    .text('YouTube', 'ui:add_account:youtube');
};
