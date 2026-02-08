import { ApplicationError, DomainError, ContractError, normalizedError } from './';

export const normalizeCustomErrorHelper = (error: ApplicationError | DomainError | ContractError): normalizedError => {
  return {
    type: 'app',
    code: error.code,
    message: error.message,
    logLevel: 'warn',
  };
};
