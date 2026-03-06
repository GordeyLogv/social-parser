import { Injectable } from '@nestjs/common';

import { LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';

@Injectable()
export class LoggerAdapter implements LoggerPort {
  constructor(
    private readonly app: LoggerAppEnum,
    private readonly handle: LoggerHandleEnum,
    private readonly handleName?: string,
  ) {}

  public info(message: string, meta?: Record<string, unknown>): void {
    this.log('info', message, meta);
  }
  public warn(message: string, meta?: Record<string, unknown>): void {
    this.log('warn', message, meta);
  }
  public error(message: string, meta?: Record<string, unknown>): void {
    this.log('error', message, meta);
  }
  public debug(message: string, meta?: Record<string, unknown>): void {
    this.log('debug', message, meta);
  }

  public withApp(app: LoggerAppEnum): LoggerPort {
    return new LoggerAdapter(app, this.handle, this.handleName);
  }
  public withHandle(handle: LoggerHandleEnum): LoggerPort {
    return new LoggerAdapter(this.app, handle, this.handleName);
  }
  public withHandleName(handleName: string): LoggerPort {
    return new LoggerAdapter(this.app, this.handle, handleName);
  }

  private log(logLevel: string, message: string, meta?: Record<string, unknown>) {
    const prefix = this.formatPrefix();
    const payload = meta ? meta : '';

    switch (logLevel) {
      case 'info':
        console.log(`${prefix}${message}`, payload);
        break;
      case 'warn':
        console.warn(`${prefix}${message}`, payload);
        break;
      case 'error':
        console.error(`${prefix}${message}`, payload);
        break;
      case 'debug':
        console.debug(`${prefix}${message}`, payload);
        break;
    }
  }

  private formatPrefix(): string {
    return `[${this.app}] : [${this.handle} - ${this.handleName}] > `;
  }
}
