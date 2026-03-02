import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  AccountDuplicateUrlError,
  AccountEntity,
  AccountFailedToSave,
  AccountRepositoryPort,
  IAccountToPrimitives,
  LoggerPort,
} from '@app/core';

import { PrismaAdapter } from '../prisma/prisma.adapter';

@Injectable()
export class AccountRepositoryAdapter implements AccountRepositoryPort {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly prisma: PrismaAdapter,
  ) {}

  public async save(account: AccountEntity): Promise<void> {
    this.logger.info('Start');

    const toPrimitives: IAccountToPrimitives = account.toPrimitives();

    try {
      await this.prisma.account.create({
        data: {
          userId: toPrimitives.userId,
          platform: toPrimitives.platform,
          handle: toPrimitives.handle,
          url: toPrimitives.url,
          syncedStatus: toPrimitives.syncedStatus,
          createdAt: toPrimitives.createdAt,
          updatedAt: toPrimitives.updatedAt,
        },
      });
      this.logger.info('Аккаунт создан', { account });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
        this.logger.warn(`Ошибка при сохранении аккаунта. Аккаунт с url: ${toPrimitives.url} - уже существует`, {
          error: error,
        });
        throw new AccountDuplicateUrlError();
      } else {
        this.logger.error('Ошибка при сохранениии аккаунта', { error: error });
        throw new AccountFailedToSave();
      }
    }
  }
}
