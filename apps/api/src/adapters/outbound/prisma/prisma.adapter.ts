import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@prisma/client';

import { LoggerPort } from '@app/core';

@Injectable()
export class PrismaAdapter extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public constructor(private readonly logger: LoggerPort) {
    const connectionString = process.env.DATABASE_URL;
    const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect().catch((e) => {
      if (e instanceof Error) {
        this.logger.error('[Adapter] Prisma failed connect', { message: e.message });
      }
    });
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect().catch((e) => {
      if (e instanceof Error) {
        this.logger.error('[Adapter] Prisma failed disconnect', { message: e.message });
      }
    });
  }
}
