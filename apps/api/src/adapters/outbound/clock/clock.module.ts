import { Global, Module } from '@nestjs/common';

import { ClockAdapter } from './clock.adapter';

import { TOKENS } from '../../../composition';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.ClockPort,
      useClass: ClockAdapter,
    },
  ],
  exports: [TOKENS.ClockPort],
})
export class ClockModule {}
