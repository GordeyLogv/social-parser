import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

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
