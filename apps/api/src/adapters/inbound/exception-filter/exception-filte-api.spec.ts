import { LoggerPort, TelegramIdInvalidError, UserPersistenceFailedError } from '@app/core';
import { ExceptionFilterApi } from './exception-filter-api';
import { ZodValidationException } from 'nestjs-zod';
import { ArgumentsHost, HttpException } from '@nestjs/common';

describe('ExceptionFilterApi', () => {
  let logger: jest.Mocked<LoggerPort>;
  let host: {
    switchToHttp: jest.Mock;
  };
  let response: {
    status: jest.Mock;
    json: jest.Mock;
  };

  let exceptionFilter: ExceptionFilterApi;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),

      withApp: jest.fn(),
      withHandle: jest.fn(),
      withHandleName: jest.fn(),
    };

    logger.withApp.mockReturnValue(logger);
    logger.withHandle.mockReturnValue(logger);
    logger.withHandleName.mockReturnValue(logger);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    host = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => response,
      }),
    };

    exceptionFilter = new ExceptionFilterApi(logger);
  });

  describe('Catch', () => {
    describe('warn log level', () => {
      it('Should normalized application error and error code mapped to status code', () => {
        const testApplicationError = new UserPersistenceFailedError();

        exceptionFilter.catch(testApplicationError, host as unknown as ArgumentsHost);

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.error).not.toHaveBeenCalled();

        expect(response.status).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(500);

        expect(response.json).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
          type: 'app',
          code: 'USER_PERSISTENCE_FAILED',
          message: 'Ошибка при создании пользователя с бд',
          logLevel: 'warn',
        });
      });

      it('Should normalized domain error and error code mapped to status code', () => {
        const testDomainError = new TelegramIdInvalidError();

        exceptionFilter.catch(testDomainError, host as unknown as ArgumentsHost);

        expect(response.status).toHaveBeenCalledWith(400);

        expect(response.json).toHaveBeenCalledWith({
          type: 'app',
          code: 'INVALID_TELEGRAM_ID',
          message: 'Невалидный Telegram ID',
          logLevel: 'warn',
        });

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.error).not.toHaveBeenCalled();
      });
    });

    describe('error log level', () => {
      it('Should normalized unknown error and error code mapped to status code', () => {
        const testUnknownError = new Error('Test unknown error');

        exceptionFilter.catch(testUnknownError, host as unknown as ArgumentsHost);

        expect(response.status).toHaveBeenCalledWith(500);

        expect(response.json).toHaveBeenCalledWith({
          type: 'unknown',
          code: 'UNKNOWN_ERROR',
          message: 'Unknown error',
          logLevel: 'error',
        });

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.warn).not.toHaveBeenCalled();
      });

      it('Should normalized http error and error code mapped to status code', () => {
        const testHttpError = new HttpException('Test http error', 500);

        exceptionFilter.catch(testHttpError, host as unknown as ArgumentsHost);

        expect(response.status).toHaveBeenCalledWith(500);

        expect(response.json).toHaveBeenCalledWith({
          type: 'infra',
          code: 'NESTJS_ERROR',
          message: 'Nest request failed',
          logLevel: 'error',
        });

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.warn).not.toHaveBeenCalled();
      });
    });
  });
});
