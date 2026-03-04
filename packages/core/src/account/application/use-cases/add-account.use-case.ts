import { ApplicationError, ClockPort, DomainError, LoggerPort } from '../../../shared';

import { AccountFactory } from '../../domain';

import { AddAccountInput } from '../../contracts';

import { AccountRepositoryPort } from '../ports';
import { AddAccountLoggingMessage } from '../messages/add-account';

export class AddAccountUseCase {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly clock: ClockPort,
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async execute(input: AddAccountInput): Promise<void> {
    this.logger.info(AddAccountLoggingMessage.START, { input });

    const now = this.clock.at();

    try {
      const createdAccountProps = AccountFactory.createNew({
        userId: input.userId,
        platform: input.platform,
        handle: input.handle,
        url: input.url,
        createdAt: now,
        updatedAt: now,
      }).toPrimitives();

      await this.accountRepository.save(createdAccountProps);

      this.logger.info(AddAccountLoggingMessage.FINISHED, { createdAccountProps });
    } catch (error) {
      if (error instanceof DomainError || error instanceof ApplicationError) {
        this.logger.warn(AddAccountLoggingMessage.FAILED, { error });
      } else {
        this.logger.error(AddAccountLoggingMessage.UNKNOWN_ERROR, { error });
      }

      throw error;
    }
  }
}
