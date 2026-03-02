import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { IUserPropsPrimitives, LoggerPort, UserAlreadyExistsError, UserFailedToSave, UserRepositoryPort } from '@app/core';

import { PrismaAdapter } from '../../outbound/prisma/prisma.adapter';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly prisma: PrismaAdapter,
  ) {}

  public async findUser(telegramId: bigint): Promise<IUserPropsPrimitives | null> {
    this.logger.info('Check user exists');

    const userProps = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    return userProps ? userProps : null;
  }

  public async save(userProps: IUserPropsPrimitives): Promise<void> {
    this.logger.info('Save user');

    try {
      await this.prisma.user.create({
        data: {
          telegramId: userProps.telegramId,
          firstName: userProps.firstName,
          createdAt: userProps.createdAt,
          updatedAt: userProps.updatedAt,
        },
      });

      this.logger.info(`Пользователь создан`);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
        this.logger.warn(
          `Ошибка при сохранении пользоватля. Пользователь с telegramId: ${userProps.telegramId} - уже существует`,
          { error: error },
        );
        throw new UserAlreadyExistsError();
      }
      this.logger.error('Ошибка при сохранении пользователя', { error: error });
      throw new UserFailedToSave();
    }
  }
}
