import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';

import { Response } from 'express';

import { LoggerPort } from '@app/core';

import { normalizedErrorHelper } from './normalized-error.helper';
import { ERROR_STATUS_MAP } from './status-code.map';

@Catch()
export class ExceptionFilterApi implements ExceptionFilter {
  public constructor(private readonly logger: LoggerPort) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const normalizedError = normalizedErrorHelper(exception);

    const statusCodeMapped = ERROR_STATUS_MAP[normalizedError.code];

    let statusCode: number = 500;

    switch (normalizedError.type) {
      case 'app':
        statusCode = statusCodeMapped;
        break;
      case 'infra':
        statusCode = statusCodeMapped;
        break;
      case 'unknown':
        statusCode = 500;
        break;
    }

    const res = {
      type: normalizedError.type,
      code: normalizedError.code,
      message: normalizedError.message,
      time: new Date().toISOString(),
    };

    switch (normalizedError.logLevel) {
      case 'error':
        this.logger.error(`${res.type} : [${res.code}] - ${res.message} _${res.time}_`);
        break;
      case 'warn':
        this.logger.warn(`${res.type} : [${res.code}] - ${res.message} _${res.time}_`);
        break;
    }

    response.status(statusCode).json(res);
  }
}
