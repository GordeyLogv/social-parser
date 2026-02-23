import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { LoggerPort, UserAlreadyExistsError, UserEntity, UserPersistenceFailedError, UserRepositoryPort } from '@app/core';

import { PrismaAdapter } from '../../outbound/prisma/prisma.adapter';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly prisma: PrismaAdapter,
  ) {}

  public async save(user: UserEntity): Promise<void> {
    const toPrimitives = user.toPrimitives();

    try {
      await this.prisma.user.create({
        data: {
          telegramId: toPrimitives.telegramId,
          firstName: toPrimitives.firstName,
          createdAt: toPrimitives.createdAt,
          updatedAt: toPrimitives.updatedAt,
        },
      });

      this.logger.info(`Пользователь создан`);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
        this.logger.warn('Ошибка при создании пользоватля. Пользователь уже существует', { error: error });
        throw new UserAlreadyExistsError();
      }
      this.logger.error('Ошибка при создании пользователя', { error: error });
      throw new UserPersistenceFailedError();
    }
  }
}
