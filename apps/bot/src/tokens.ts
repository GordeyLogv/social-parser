export const TOKENS = {
  // Adapters
  LoggerPort: Symbol.for('LoggerPort'),
  ConfigPort: Symbol.for('ConfigPort'),
  ExceptionFilterPort: Symbol.for('ExceptionFilterPort'),
  UserApiPort: Symbol.for('UserApiPort'),

  // Logging
  ConfigLogger: Symbol.for('ConfigLogger'),
  UserApiLogger: Symbol.for('UserApiLogger'),
  StartCommandLogger: Symbol.for('StartCommandLogger'),
  TelegramBotLogger: Symbol.for('TelegramBotLogger'),

  // Commands
  StartCommand: Symbol.for('StartCommand'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
