import { InlineKeyboard } from 'grammy';

export const backKeyboard = (path: string) => {
  return new InlineKeyboard().text('⬅️ Назад', path);
};
