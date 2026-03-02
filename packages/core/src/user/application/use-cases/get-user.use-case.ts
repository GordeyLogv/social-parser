import { ApplicationError, DomainError, LoggerPort } from '../../../shared';

import { UserFactory } from '../../domain';

import { UserRepositoryPort } from '../ports';
import { GetUserInput, GetUserOutput } from '../../contracts';
import { GetUserLoggingMessages } from '../messages';
import { UserNotFoundError, UserPersistenceFailedError } from '../errors';

export class GetUserUseCase {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async execute(input: GetUserInput): Promise<GetUserOutput> {
    this.logger.info(GetUserLoggingMessages.START, { input });

    const parserTelegramId: bigint = BigInt(input.telegramId);

    const persistenceValueUser = await this.userRepository.findUser(parserTelegramId);

    if (persistenceValueUser == null) {
      throw new UserNotFoundError();
    }

    try {
      const persistenceUser = UserFactory.fromPersistence(persistenceValueUser);

      this.logger.info(GetUserLoggingMessages.FINISHED, { persistenceUser });

      return { user: persistenceUser };
    } catch (error) {
      if (error instanceof DomainError || error instanceof ApplicationError) {
        this.logger.warn(GetUserLoggingMessages.FAILED, { error });
        throw error;
      } else {
        this.logger.error(GetUserLoggingMessages.FAILED, { error });
        throw new UserPersistenceFailedError();
      }
    }
  }
}
