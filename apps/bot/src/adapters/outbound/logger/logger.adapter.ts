import { injectable } from 'inversify';

import { LoggerPort } from '@app/core';

@injectable()
export class LoggerAdapter implements LoggerPort {
  public info(message: string, meta?: Record<string, unknown>) {
    console.log(message, meta ?? '');
  }

  public warn(message: string, meta?: Record<string, unknown>) {
    console.warn(message, meta ?? '');
  }

  public error(message: string, meta?: Record<string, unknown>) {
    console.error(message, meta ?? '');
  }
}
