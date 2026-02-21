export const TOKENS = {
  // Adapters
  LoggerPort: Symbol.for('LoggerPort'),
  ConfigPort: Symbol.for('ConfigPort'),
  ExceptionFilterPort: Symbol.for('ExceptionFilterPort'),

  // Logging
  ConfigLogger: Symbol.for('ConfigLogger'),
  StartCommandLogger: Symbol.for('StartCommandLogger'),
  TelegramBotLogger: Symbol.for('TelegramBotLogger'),

  // Commands
  StartCommand: Symbol.for('StartCommand'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
