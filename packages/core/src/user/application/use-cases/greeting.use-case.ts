import { LoggerPort } from '@shared';

import { UserGreetingInput, UserGreetingOutput } from '../../contracts';

import { greetingMessage, greetingLoggingMessage } from '../messages';

export class UserGreetingUseCase {
  public constructor(private readonly logger: LoggerPort) {}

  public execute(input: UserGreetingInput): UserGreetingOutput {
    this.logger.info(greetingLoggingMessage.START, {
      userTelegramId: input.userId,
      userFirstName: input.userFirstName,
    });

    return { greetingMessage: greetingMessage(input.userFirstName) };
  }
}
