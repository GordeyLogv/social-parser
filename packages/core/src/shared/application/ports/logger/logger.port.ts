import { LoggerAppEnum } from './logger-app.enum';
import { LoggerHandleEnum } from './logger-handle.enum';

export interface LoggerPort {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;

  withApp: (app: LoggerAppEnum) => LoggerPort;
  withHandle: (handle: LoggerHandleEnum) => LoggerPort;
}
