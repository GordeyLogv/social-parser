import { initContainer } from '../composition/container';

import { TYPES } from '../types';

import { TelegramBot } from './telegram-bot';

export const bootstrap = () => {
  const container = initContainer();
  const app = container.get<TelegramBot>(TYPES.TelegramBot);
  return app;
};
