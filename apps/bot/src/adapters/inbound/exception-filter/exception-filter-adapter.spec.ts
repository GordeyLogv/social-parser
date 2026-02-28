import { LoggerPort } from '@app/core';

import { ExceptionFilterAdapter } from './exception-filter.adapter';
import { ApiError } from '../../../common';
import { Context, GrammyError, HttpError } from 'grammy';
import { ErrorCodeToMessageMapper } from './error-code-to-message.mapper';

describe('ExceptionFilterAdapter', () => {
  let logger: jest.Mocked<LoggerPort>;
  let ctx: Context;
  let replyMock: jest.Mock;
  let adapter: ExceptionFilterAdapter;

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

    replyMock = jest.fn().mockResolvedValue(undefined);

    ctx = {
      reply: replyMock,
    } as unknown as Context;

    adapter = new ExceptionFilterAdapter(logger);
  });
  describe('handle', () => {
    describe('warn log level', () => {
      it('Should log warn and reply mapped message for ApiError', async () => {
        const testApiError = new ApiError('FIRST_NAME_TOO_SHORT', 'Имя пользователя слишком короткое');

        await adapter.handle(testApiError, ctx);

        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.warn).toHaveBeenCalledWith(expect.any(String));
        expect(logger.error).not.toHaveBeenCalled();
        expect(replyMock).toHaveBeenCalledTimes(1);
        expect(replyMock).toHaveBeenCalledWith(ErrorCodeToMessageMapper.FIRST_NAME_TOO_SHORT);
      });
    });

    describe('error log level', () => {
      it('Should log error and reply mapped message for HttpError', async () => {
        const testHttpError = new HttpError('Http error', 'HTTP_ERROR');

        await adapter.handle(testHttpError, ctx);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(expect.any(String));
        expect(logger.warn).not.toHaveBeenCalled();
        expect(replyMock).toHaveBeenCalledTimes(1);
        expect(replyMock).toHaveBeenCalledWith(ErrorCodeToMessageMapper.HTTP_ERROR);
      });

      it('Should log error and reply mapped message for GrammyError', async () => {
        const testGrammyError = new GrammyError(
          'Test grammy error',
          { ok: false, error_code: 500, description: 'test' },
          'TEST',
          {
            test: 'Test',
          },
        );

        await adapter.handle(testGrammyError, ctx);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(expect.any(String));
        expect(logger.warn).not.toHaveBeenCalled();
        expect(replyMock).toHaveBeenCalledTimes(1);
        expect(replyMock).toHaveBeenCalledWith(ErrorCodeToMessageMapper.GRAMMY_ERROR);
      });

      it('Should log error and reply mapped message for UnknownError', async () => {
        const testUnknownError = new Error('Unknown error');

        await adapter.handle(testUnknownError, ctx);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(expect.any(String));
        expect(logger.warn).not.toHaveBeenCalled();
        expect(replyMock).toHaveBeenCalledTimes(1);
        expect(replyMock).toHaveBeenCalledWith(ErrorCodeToMessageMapper.UNKNOWN_ERROR);
      });
    });
  });
});
