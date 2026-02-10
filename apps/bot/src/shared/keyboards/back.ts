import { InlineKeyboard } from 'grammy';

export const backKeyboard = (patch: string) => {
  return new InlineKeyboard().text('⬅️ Назад', patch);
};
