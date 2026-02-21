import { Injectable, Logger } from '@nestjs/common';

import { UserEntity, UserRepositoryPort } from '@app/core';

import { PrismaService } from '../../outbound/prisma/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(UserRepository.name);

  public constructor(private readonly prisma: PrismaService) {}

  public async save(user: UserEntity): Promise<void> {
    const toProps = user.toProps();

    try {
      await this.prisma.user.create({
        data: {
          telegramId: toProps.telegramId,
          firstName: toProps.firstName,
        },
      });

      this.logger.log(`Пользователь создан`);
    } catch (error) {
      this.logger.error('Ошибка при создании пользователя', error);
      throw error;
    }
  }
}
