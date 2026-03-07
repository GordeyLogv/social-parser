import { ZodValidationException } from 'nestjs-zod';

import { NormalizedError } from '@app/core';

import { ParserError } from '../../errors';

export const normalizedErrorHelper = (error: unknown): NormalizedError => {
  if (error instanceof ParserError) {
    return {
      type: 'infra',
      code: error.code,
      message: error.message,
      logLevel: 'warn',
    };
  }

  if (error instanceof ZodValidationException) {
    return {
      type: 'infra',
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      logLevel: 'warn',
    };
  }

  return {
    type: 'unknown',
    code: 'UNKNOWN_ERROR',
    message: 'Unknown error',
    logLevel: 'error',
  };
};
