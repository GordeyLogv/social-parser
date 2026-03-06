import { Controller, Inject } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { UpdateService } from './update.service';

@Controller()
export class UpdateController {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    private readonly service: UpdateService,
  ) {}
}
