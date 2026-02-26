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
  CommandsRegistryLogger: Symbol.for('CommandsRegistryLogger'),
  ExceptionFilterLogger: Symbol.for('ExceptionFilterLogger'),

  // Commands
  ICommand: Symbol.for('ICommand'),
  CommandsRegistry: Symbol.for('CommandsRegistry'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
