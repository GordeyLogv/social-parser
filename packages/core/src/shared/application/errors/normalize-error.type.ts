export type normalizedError = {
  type: 'app' | 'infra' | 'unknown';
  code: string;
  message: string;
  logLevel: 'info' | 'warn' | 'error';
  meta?: Record<string, unknown>;
};
