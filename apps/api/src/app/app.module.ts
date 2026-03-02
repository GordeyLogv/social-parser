import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule, PrismaModule, UserModule, LoggerModule, ClockModule, ExceptionFilterApiModule } from '../adapters';

import { configRoot } from '../common/configs';

@Module({
  imports: [
    ConfigModule.forRoot(configRoot),
    PrismaModule,
    ExceptionFilterApiModule,
    LoggerModule,
    ClockModule,

    UserModule,
    AccountModule,
  ],
})
export class AppModule {}
