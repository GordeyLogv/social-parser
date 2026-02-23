import { HttpException } from '@nestjs/common';

import { ZodValidationException } from 'nestjs-zod';

import { ApplicationError, DomainError, NormalizedError, normalizedCustomErrorHelper } from '@app/core';

export const normalizedErrorHelper = (error: unknown): NormalizedError => {
  if (error instanceof DomainError || error instanceof ApplicationError) {
    return normalizedCustomErrorHelper(error);
  }

  if (error instanceof ZodValidationException) {
    return {
      type: 'infra',
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      logLevel: 'warn',
    };
  }

  if (error instanceof HttpException) {
    return {
      type: 'infra',
      code: 'NESTJS_ERROR',
      message: 'Nest request failed',
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
