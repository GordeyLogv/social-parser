import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';
import { AddUserResponse } from '@app/contracts';

import { UserService } from './user.service';
import { TOKENS } from '../../../tokens';
import { AddUserDto } from './dtos';

@Controller('users')
export class UserController {
  public constructor(
    @Inject(TOKENS.UserControllerLogging) private readonly logger: LoggerPort,
    private readonly service: UserService,
  ) {}

  @Post()
  public async addUser(@Body() dto: AddUserDto): Promise<AddUserResponse> {
    this.logger.info('start');

    await this.service.addUser(dto.telegramId, dto.firstName);
  }
}
