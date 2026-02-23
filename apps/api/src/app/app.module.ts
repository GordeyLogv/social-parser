import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule, PrismaModule, UserModule, LoggerModule, ClockModule } from '../adapters';

import { configRoot } from '../common/configs';
import { ExceptionFilterApiModule } from '../adapters/inbound/exception-filter/exception-filter-api.module';

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
