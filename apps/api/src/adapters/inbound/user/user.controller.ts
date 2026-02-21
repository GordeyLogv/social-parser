import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';

import { AddUserDto } from './dtos';

import { TOKENS } from '../../../composition';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    private readonly userService: UserService,
  ) {}

  @Post()
  public async addUser(@Body() dto: AddUserDto): Promise<void> {
    const telegramId = BigInt(dto.telegramId);

    await this.userService.addUser(telegramId, dto.firstName);
  }
}
