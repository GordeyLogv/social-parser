import { Body, Controller, Inject, Post } from '@nestjs/common';

import { LoggerPort } from '@app/core';
import { ConfirmAccountResponse, SearchAccountResponse } from '@app/contracts';

import { TOKENS } from '../../../tokens';
import { AccountService } from './account.service';
import { SearchAccountDto, ConfirmAccountDto } from './dtos';

@Controller('accounts')
export class AccountController {
  public constructor(
    @Inject(TOKENS.AccountControllerLogging) private readonly logger: LoggerPort,
    private readonly service: AccountService,
  ) {}

  @Post('/search')
  public async searchAccount(@Body() dto: SearchAccountDto): Promise<SearchAccountResponse> {}

  @Post()
  public async addAccount(@Body() dto: ConfirmAccountDto): Promise<ConfirmAccountResponse> {}
}
