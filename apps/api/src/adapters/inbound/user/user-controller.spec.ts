import { ApplicationError, FirstNameTooLongError, LoggerPort, UserAlreadyExistsError } from '@app/core';

import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let logger: jest.Mocked<LoggerPort>;
  let service: { addUser: jest.Mock };

  let controller: UserController;

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

    service = {
      addUser: jest.fn(),
    };

    controller = new UserController(logger, service as unknown as UserService);
  });

  describe('AddUser', () => {
    const testDto = {
      telegramId: '123456789',
      firstName: 'Gordey',
    };

    it('Should log and called UserService', async () => {
      service.addUser.mockResolvedValue(undefined);

      expect(await controller.addUser(testDto)).toEqual(undefined);

      expect(logger.info).toHaveBeenCalled();

      expect(service.addUser).toHaveBeenCalledTimes(1);
      expect(service.addUser).toHaveBeenCalledWith(testDto.telegramId, testDto.firstName);
    });

    it('Should log and rethrow when UserService throw domain error', async () => {
      service.addUser.mockRejectedValue(new FirstNameTooLongError());

      await expect(controller.addUser(testDto)).rejects.toThrow();
    });

    it('Should log and rethrow when UserService throw application error', async () => {
      service.addUser.mockRejectedValue(new UserAlreadyExistsError());

      await expect(controller.addUser(testDto)).rejects.toThrow();
    });

    it('Should log and rethrow when UserService throw unknown error', async () => {
      service.addUser.mockRejectedValue(new Error('Test unknown error'));

      await expect(controller.addUser(testDto)).rejects.toThrow();
    });
  });
});
