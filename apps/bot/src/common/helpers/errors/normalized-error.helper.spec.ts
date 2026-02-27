import { NormalizedError } from '@app/core';

import { ApiError } from '../../errors';

import { HttpError, GrammyError } from 'grammy';

import { normalizedErrorHelper } from './normalized-error.helper';

describe('NormalizedErrorHelper', () => {
  it('Should create normalized error when input error instanse of ApiError', () => {
    const testApiError = new ApiError('TEST_API_ERROR', 'Test api error');

    const normalizedError: NormalizedError = normalizedErrorHelper(testApiError);

    expect(normalizedError).toEqual({
      type: 'app',
      code: 'TEST_API_ERROR',
      message: 'Test api error',
      logLevel: 'warn',
    });
  });

  it('Should create normalized error when input error instanse of HttpError', () => {
    const testHttpError = new HttpError('Test http error', 'HTTP_TEST');

    const normalizedError: NormalizedError = normalizedErrorHelper(testHttpError);

    expect(normalizedError).toEqual({
      type: 'infra',
      code: 'HTTP_ERROR',
      message: 'Http error',
      logLevel: 'error',
    });
  });

  it('Should create normalized error when input error instanse of GrammyError', () => {
    const grammyError = new GrammyError('Test grammy error', { ok: false, error_code: 500, description: 'test' }, 'TEST', {
      test: 'test',
    });

    const normalizedError: NormalizedError = normalizedErrorHelper(grammyError);

    expect(normalizedError).toEqual({
      type: 'infra',
      code: 'GRAMMY_ERROR',
      message: 'Grammy error',
      logLevel: 'error',
    });
  });

  it('Should create normalized error when input error is unknown error', () => {
    const normalizedError: NormalizedError = normalizedErrorHelper(new Error('Test_undefined_error'));

    expect(normalizedError).toEqual({
      type: 'unknown',
      code: 'UNKNOWN_ERROR',
      message: 'Unknown error',
      logLevel: 'error',
    });
  });
});
