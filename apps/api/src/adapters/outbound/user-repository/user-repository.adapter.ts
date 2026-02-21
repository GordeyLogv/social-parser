import { Injectable, Inject } from '@nestjs/common';

import { LoggerPort, UserEntity, UserRepositoryPort } from '@app/core';

import { PrismaAdapter } from '../../outbound/prisma/prisma.adapter';

import { TOKENS } from '../../../composition';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    private readonly prisma: PrismaAdapter,
  ) {}

  public async save(user: UserEntity): Promise<void> {
    const toProps = user.toProps();

    try {
      await this.prisma.user.create({
        data: {
          telegramId: toProps.telegramId,
          firstName: toProps.firstName,
        },
      });

      this.logger.info(`Пользователь создан`);
    } catch (error) {
      this.logger.error('Ошибка при создании пользователя', { error: error });
      throw error;
    }
  }
}
