import { ApplicationError } from './base-error-application.error';
import { DomainError } from './base-error-domain.error';

import { NormalizedError } from './normalized-error.type';

export const normalizedCustomErrorHelper = (error: DomainError | ApplicationError): NormalizedError => {
  return {
    type: 'app',
    code: error.code,
    message: error.message,
    logLevel: 'warn',
  };
};
