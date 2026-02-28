import {
  AddUserUseCase,
  ApplicationError,
  DomainError,
  FirstNameTooShortError,
  LoggerPort,
  UserAlreadyExistsError,
} from '@app/core';
import { UserService } from './user.service';

describe('UserService', () => {
  let logger: jest.Mocked<LoggerPort>;
  let useCase: { execute: jest.Mock };

  let service: UserService;

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

    useCase = {
      execute: jest.fn(),
    };

    service = new UserService(logger, useCase as unknown as AddUserUseCase);
  });

  describe('AddUser', () => {
    const testDto = {
      telegramId: '123456789',
      firstName: 'Gordey',
    };

    it('Should log and called AddUserUseCase', async () => {
      useCase.execute.mockResolvedValue(undefined);

      expect(await service.addUser(testDto.telegramId, testDto.firstName)).toEqual(undefined);

      expect(logger.info).toHaveBeenCalled();

      expect(useCase.execute).toHaveBeenCalled();
      expect(useCase.execute).toHaveBeenCalledWith(testDto);
    });

    it('Should log and rethrow when AddUserUseCase throw domain error', async () => {
      useCase.execute.mockRejectedValue(new FirstNameTooShortError());

      await expect(service.addUser(testDto.telegramId, testDto.firstName)).rejects.toBeInstanceOf(DomainError);

      expect(logger.info).toHaveBeenCalled();
    });

    it('Should log and rethrow when AddUserUseCase throw application error', async () => {
      useCase.execute.mockRejectedValue(new UserAlreadyExistsError());

      await expect(service.addUser(testDto.telegramId, testDto.firstName)).rejects.toBeInstanceOf(ApplicationError);

      expect(logger.info).toHaveBeenCalled();
    });

    it('Should log and rethrow when AddUserUseCase throw unknown error', async () => {
      useCase.execute.mockRejectedValue(new Error('Test unknown error'));

      await expect(service.addUser(testDto.telegramId, testDto.firstName)).rejects.toBeInstanceOf(Error);

      expect(logger.info).toHaveBeenCalled();
    });
  });
});
