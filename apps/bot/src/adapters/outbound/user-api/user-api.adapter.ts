import { inject, injectable } from 'inversify';

import { ConfigPort, LoggerPort } from '@app/core';
import { AddUserRequest } from '@app/contracts';

import { UserApiPort } from './user-api.port';

import { TOKENS } from '../../../tokens';

@injectable()
export class UserApiAdapter implements UserApiPort {
  private baseUrl: string;

  public constructor(
    @inject(TOKENS.UserApiLogger) private readonly logger: LoggerPort,
    @inject(TOKENS.ConfigPort) private readonly config: ConfigPort,
  ) {
    this.baseUrl = this.config.get('USER_API_URL');
    this.logger.info(`Loading success, baseUrl: ${this.baseUrl}`);
  }

  public async addUser(input: AddUserRequest): Promise<void> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      this.logger.info(JSON.stringify(response));
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
    }
  }
}
