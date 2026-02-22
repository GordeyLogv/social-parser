import { Injectable } from '@nestjs/common';
import { ClockPort, LoggerPort } from '@app/core';
import { inject } from 'inversify';
import { TOKENS } from '../../../composition';

@Injectable()
export class ClockAdapter implements ClockPort {
  public at(): Date {
    return new Date();
  }
}
