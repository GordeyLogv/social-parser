import { ApplicationError, DomainError, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '../../../shared';

import { UserFactory } from '../../domain';

import { AddUserInput } from '../../contracts';

import { AddUserLoggingMessage } from '../messages/add-user';

import { UserRepositoryPort, ClockPort } from '../ports';

export class AddUserUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly userRepository: UserRepositoryPort,
    private readonly clock: ClockPort,
  ) {
    this.logger.withApp(LoggerAppEnum.CORE).withHandle(LoggerHandleEnum.USECASE).withHandleName(AddUserUseCase.name);
  }

  public async execute(input: AddUserInput): Promise<void> {
    this.logger.info(AddUserLoggingMessage.START, { input });

    const now: Date = this.clock.at();

    try {
      const createdUser = UserFactory.createNew({
        telegramId: input.telegramId,
        firstName: input.firstName,
        createdAt: now,
        updatedAt: now,
      });

      await this.userRepository.save(createdUser);

      this.logger.info(AddUserLoggingMessage.FINISHED, { createdUser });
    } catch (error) {
      if (error instanceof DomainError || error instanceof ApplicationError) {
        this.logger.warn(AddUserLoggingMessage.FAILED, { error });
      } else {
        this.logger.error(AddUserLoggingMessage.UNKNOWN_ERROR, { error });
      }
      throw error;
    }
  }
}
