import { Injectable } from '@nestjs/common';
import { ClockPort } from '@app/core';

@Injectable()
export class ClockAdapter implements ClockPort {
  public at(): Date {
    return new Date();
  }
}
