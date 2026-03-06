import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { TOKENS } from '../../../tokens';

@Module({
  controllers: [UpdateController],
  providers: [
    UpdateService,
    {
      provide: TOKENS.UpdateControllerLogger,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.CONTROLLER).withHandleName(UpdateController.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.UpdateServiceLogger,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.SERVICE).withHandleName(UpdateService.name),
      inject: [TOKENS.LoggerPort],
    },
  ],
})
export class UpdateModule {}
