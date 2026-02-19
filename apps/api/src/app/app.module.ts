import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule, PrismaModule, UserModule } from '../adapters';

import { configRoot } from '../common/configs';

@Module({
  imports: [ConfigModule.forRoot(configRoot), PrismaModule, UserModule, AccountModule],
})
export class AppModule {}
