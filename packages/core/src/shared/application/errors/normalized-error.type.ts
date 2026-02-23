export type NormalizedError = {
  type: 'app' | 'infra' | 'unknown';
  code: string;
  message: string;
  logLevel: 'warn' | 'error';
  meta?: Record<string, unknown>;
};
