import { InlineKeyboard } from 'grammy';

export const menuKeyboard = () => {
  return new InlineKeyboard()
    .text('‼️ Помощь', 'ui:help')
    .row()
    .text('🔎 Мои аккаунты', 'ui:my_accounts')
    .row()
    .text('⚒️ Добавить аккаунт', 'ui:add_account')
    .row()
    .text('⚖️ Топ 10', 'ui:top_accounts');
};
