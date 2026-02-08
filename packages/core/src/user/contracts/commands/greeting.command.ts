export interface UserGreetingInput {
  userTelegramId: number;
  userFirstName: string;
}

export interface UserGreetingOutput {
  greetingMessage: string;
}
