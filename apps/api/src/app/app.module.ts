import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule, PrismaModule, UserModule, LoggerModule, ClockModule } from '../adapters';

import { configRoot } from '../common/configs';

@Module({
  imports: [ConfigModule.forRoot(configRoot), PrismaModule, LoggerModule, ClockModule, UserModule, AccountModule],
})
export class AppModule {}
