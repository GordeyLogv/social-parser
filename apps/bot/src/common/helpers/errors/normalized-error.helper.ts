import { NormalizedError } from '@app/core';
import { ApiError } from '../../errors';
import { GrammyError, HttpError } from 'grammy';

export const normalizedErrorHelper = (error: unknown): NormalizedError => {
  if (error instanceof ApiError) {
    return {
      type: 'app',
      code: error.code,
      message: error.message,
      logLevel: 'warn',
    };
  }

  if (error instanceof HttpError) {
    return {
      type: 'infra',
      code: 'HTTP_ERROR',
      message: 'Http error',
      logLevel: 'error',
    };
  }

  if (error instanceof GrammyError) {
    return {
      type: 'infra',
      code: error.name,
      message: 'Grammy error',
      logLevel: 'error',
    };
  }

  return {
    type: 'unknown',
    code: 'UNKNOWN_ERROR',
    message: 'Unknown error',
    logLevel: 'error',
  };
};
