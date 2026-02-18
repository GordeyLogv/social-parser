import { Module } from '@nestjs/common';

import { AccountModule, PrismaModule, UserModule } from '../adapters';

@Module({
  imports: [PrismaModule, UserModule, AccountModule],
})
export class AppModule {}
