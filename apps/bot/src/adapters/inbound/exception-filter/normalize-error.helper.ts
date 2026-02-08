import { GrammyError, HttpError } from 'grammy';

import { ApplicationError, normalizedError, normalizeCustomErrorHelper } from '@app/core';

export const normalizeErrorHelper = (error: unknown): normalizedError => {
  if (error instanceof GrammyError) {
    return {
      type: 'infra',
      code: 'GRAMMY_ERROR',
      message: 'Что то пошло не так, попробуйте позже.',
      logLevel: 'error',
      meta: { description: error.description },
    };
  }

  if (error instanceof HttpError) {
    return {
      type: 'infra',
      code: 'HTTP_ERROR',
      message: 'Ошибка соединения, попробуйте позже',
      logLevel: 'error',
    };
  }

  if (error instanceof ApplicationError) {
    return normalizeCustomErrorHelper(error);
  }

  return {
    type: 'unknown',
    code: 'UNKNOWN_ERROR',
    message: 'Произошла неизвестная ошибка. Попробуйте позже',
    logLevel: 'error',
    meta: { error },
  };
};
