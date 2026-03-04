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

  public async save(account: IAccountToPrimitives): Promise<void> {
    this.logger.info('Start to save account props', { account });

    try {
      await this.prisma.account.create({
        data: {
          userId: account.userId,
          platform: account.platform,
          handle: account.handle,
          url: account.url,
          syncedStatus: account.syncedStatus,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        },
      });
      this.logger.info('Complete to save account', { account });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
        this.logger.warn(`Error to save account. Account: ${account.url} - is exists`, {
          error: error,
        });
        throw new AccountDuplicateUrlError();
      } else {
        this.logger.error('Unknown error to save account', { error: error });
        throw new AccountFailedToSave();
      }
    }
  }
}
