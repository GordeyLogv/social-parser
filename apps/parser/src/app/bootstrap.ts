import { initContainer } from '../composition';
import { TOKENS } from '../tokens';
import { Parser } from './parser';

export const bootstrap = () => {
  const container = initContainer();
  const app = container.get<Parser>(TOKENS.Parser);
  return app;
};
