import { ApplicationError, DomainError, LoggerPort } from '../../../shared';

import { ClockPort, UserRepositoryPort } from '../ports';
import { AddUserUseCase } from './add-user.use-case';

describe('AddUserUseCase', () => {
  let logger: jest.Mocked<LoggerPort>;
  let userRepository: jest.Mocked<UserRepositoryPort>;
  let clock: jest.Mocked<ClockPort>;

  let useCase: AddUserUseCase;

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

    userRepository = {
      save: jest.fn(),
    };

    clock = {
      at: jest.fn(),
    };

    useCase = new AddUserUseCase(logger, userRepository, clock);
  });

  class TestApplicationError extends ApplicationError {
    override code = 'TEST_APPLICATION_ERROR';

    constructor() {
      super('Test application error');
    }
  }

  const mockInput = {
    telegramId: '123456789',
    firstName: 'Gordey',
  };

  it('Should save user when input is valid', async () => {
    const now = new Date('2026-01-01T00:00:00.000Z');

    clock.at.mockReturnValue(now);
    userRepository.save.mockResolvedValue(undefined);

    await useCase.execute(mockInput);

    const savedUser = userRepository.save.mock.calls[0][0];

    expect(logger.info).toHaveBeenCalledTimes(2);
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
    expect(clock.at).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledTimes(1);

    expect(savedUser.toPrimitives()).toMatchObject({
      telegramId: 123456789n,
      firstName: 'Gordey',
      createdAt: now,
      updatedAt: now,
    });
  });

  it('Should log warn and rethrow when domain validation fails', async () => {
    const now = new Date();

    clock.at.mockReturnValue(now);

    await expect(
      useCase.execute({
        telegramId: 'not valid id',
        firstName: 'Gordey',
      }),
    ).rejects.toBeInstanceOf(DomainError);

    expect(logger.info).toHaveBeenCalledTimes(1);

    expect(userRepository.save).not.toHaveBeenCalled();

    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('Should log warn and rethrow when repository throws application error', async () => {
    const now = new Date();
    const appTestError = new TestApplicationError();

    clock.at.mockReturnValue(now);
    userRepository.save.mockRejectedValue(appTestError);

    await expect(useCase.execute(mockInput)).rejects.toBeInstanceOf(ApplicationError);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('Should log error and rethrow when repository throws unknown error', async () => {
    const now = new Date();
    const unknownTestError = new Error('Unknown test error');

    clock.at.mockReturnValue(now);
    userRepository.save.mockRejectedValue(unknownTestError);

    await expect(useCase.execute(mockInput)).rejects.toBe(unknownTestError);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
