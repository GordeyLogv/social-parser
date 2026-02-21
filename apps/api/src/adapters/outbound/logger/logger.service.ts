import { Injectable } from '@nestjs/common';

import { LoggerPort } from '@app/core';

@Injectable()
export class LoggerAdapter implements LoggerPort {
  public info(message: string, meta?: Record<string, unknown>): void {
    console.log(message, meta ? meta : '');
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(message, meta ? meta : '');
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    console.error(message, meta ? meta : '');
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    console.debug(message, meta ? meta : '');
  }
}
