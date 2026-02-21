import { initContainer } from '../composition/container';
import { TOKENS } from '../tokens';
import { TelegramBot } from './telegram-bot';

export const bootstrap = () => {
  const container = initContainer();
  const app = container.get<TelegramBot>(TOKENS.TelegramBot);
  return app;
};
