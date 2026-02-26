import { inject, injectable } from 'inversify';

import { ConfigPort, LoggerPort, NormalizedError } from '@app/core';
import { AddUserRequest } from '@app/contracts';

import { UserApiPort } from './user-api.port';
import { TOKENS } from '../../../tokens';
import { ApiError } from '../../../common/errors/api-error';

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
    const res = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegramId: '23454323231177', firstName: 'w' }),
    });

    if (res.ok) return;

    const text = await res.text();
    const parsed: NormalizedError | null = text ? JSON.parse(text) : null;

    if (!parsed) {
      throw new Error('Parsed error');
    }

    if (parsed && parsed.code != 'USER_ALREADY_EXISTS') {
      this.logger.warn(`[StatusCode: ${res.status}]: ${parsed.code} - ${parsed.message}`);
      throw new ApiError(parsed.code, parsed.message);
    }
  }
}
