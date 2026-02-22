import { Injectable } from '@nestjs/common';

import { ClockPort, LoggerPort } from '@app/core';

@Injectable()
export class ClockAdapter implements ClockPort {
  public constructor(private readonly logger: LoggerPort) {}

  public at(): Date {
    const newDate = new Date();
    this.logger.info(`Generate at success, ${newDate.getTime()}`);
    return newDate;
  }
}
