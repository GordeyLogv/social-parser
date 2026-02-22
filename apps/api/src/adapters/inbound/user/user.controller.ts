import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { AddUserDto } from './dtos';

import { UserService } from './user.service';
import { TOKENS } from '../../../tokens';

@Controller('users')
export class UserController {
  public constructor(
    @Inject(TOKENS.UserControllerLogging) private readonly logger: LoggerPort,
    private readonly userService: UserService,
  ) {}

  @Post()
  public async addUser(@Body() dto: AddUserDto): Promise<void> {
    this.logger.info('start');

    await this.userService.addUser(dto.telegramId, dto.firstName);
  }
}
