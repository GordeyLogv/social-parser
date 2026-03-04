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
    this.logger.info('Start finding user by telegram id', { telegramId });

    const userProps = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!userProps) {
      this.logger.info('User not exists', { telegramId });
      return null;
    }

    this.logger.info('User is exists', { props: userProps });
    return userProps;
  }

  public async save(userProps: IUserPropsPrimitives): Promise<void> {
    this.logger.info('Start save user', { props: userProps });

    try {
      await this.prisma.user.create({
        data: {
          telegramId: userProps.telegramId,
          firstName: userProps.firstName,
          createdAt: userProps.createdAt,
          updatedAt: userProps.updatedAt,
        },
      });

      this.logger.info(`Complete save user`, { props: userProps });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
        this.logger.warn(`Error to save user. User is exists by telegramId: ${userProps.telegramId}`, {
          error: error,
        });
        throw new UserAlreadyExistsError();
      }
      this.logger.error('Unknown error to save user', { error: error });
      throw new UserFailedToSave();
    }
  }
}
