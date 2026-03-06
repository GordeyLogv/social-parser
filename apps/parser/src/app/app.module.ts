import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configRoot } from '../common/configs';

import { ApiYoutubeModule, LoggerModule } from '../adapters/outbound';
import { SearchModule, UpdateModule } from '../adapters/inbound';

@Module({
  imports: [ConfigModule.forRoot(configRoot), LoggerModule, SearchModule, UpdateModule, ApiYoutubeModule],
})
export class AppModule {}
