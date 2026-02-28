import { ApplicationError, LoggerPort, UserFactory } from '@app/core';
import { PrismaAdapter } from '../prisma/prisma.adapter';
import { UserRepositoryAdapter } from './user-repository.adapter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

describe('UserRepositoryAdapter', () => {
  let logger: jest.Mocked<LoggerPort>;
  let prisma: {
    user: {
      create: jest.Mock;
    };
  };

  let userRepository: UserRepositoryAdapter;

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

    prisma = {
      user: {
        create: jest.fn(),
      },
    };

    userRepository = new UserRepositoryAdapter(logger, prisma as unknown as PrismaAdapter);
  });

  describe('Save', () => {
    const now = new Date();

    const testUser = UserFactory.createNew({
      telegramId: '123456789',
      firstName: 'Gordey',
      createdAt: now,
      updatedAt: now,
    });

    it('Should save user where user entity not throw error and prisma not throw error', async () => {
      prisma.user.create.mockResolvedValue(undefined);

      expect(await userRepository.save(testUser)).toEqual(undefined);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          telegramId: testUser.toPrimitives().telegramId,
          firstName: testUser.toPrimitives().firstName,
          createdAt: testUser.toPrimitives().createdAt,
          updatedAt: testUser.toPrimitives().updatedAt,
        },
      });

      expect(logger.info).toHaveBeenCalled();
    });

    it('Should throw application error when prisma throw PrismaClientKnownRequestError and code = P2002', async () => {
      prisma.user.create.mockRejectedValue(
        new PrismaClientKnownRequestError('Test error', { code: 'P2002', clientVersion: 'TEST' }),
      );

      await expect(userRepository.save(testUser)).rejects.toBeInstanceOf(ApplicationError);

      expect(logger.warn).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('Should throw application error when prisma throw error', async () => {
      prisma.user.create.mockRejectedValue(
        new PrismaClientKnownRequestError('Test error', { code: 'TEST', clientVersion: 'TEST' }),
      );

      await expect(userRepository.save(testUser)).rejects.toBeInstanceOf(ApplicationError);

      expect(logger.error).toHaveBeenCalled();
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });
});
