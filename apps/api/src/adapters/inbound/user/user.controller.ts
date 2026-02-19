import { Body, Controller, Logger, Post } from '@nestjs/common';

import { AddUserDto } from './dtos';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  @Post()
  public async addUser(@Body() dto: AddUserDto): Promise<void> {}
}
