export const TOKENS = {
  // Adapters
  LoggerPort: Symbol.for('LoggerPort'),
  ConfigPort: Symbol.for('ConfigPort'),
  ExceptionFilterPort: Symbol.for('ExceptionFilterPort'),
  UserApiPort: Symbol.for('UserApiPort'),

  // Logging
  TelegramBotLogger: Symbol.for('TelegramBotLogger'),

  ConfigLogger: Symbol.for('ConfigLogger'),
  ExceptionFilterLogger: Symbol.for('ExceptionFilterLogger'),
  UserApiLogger: Symbol.for('UserApiLogger'),

  StartCommandLogger: Symbol.for('StartCommandLogger'),

  HelpCallbackQueryLogger: Symbol.for('HelpCallbackQueryLogger'),

  CommandsRegistryLogger: Symbol.for('CommandsRegistryLogger'),
  CallbackQueriesRegistryLogger: Symbol.for('CallbackQueriesRegistryLogger'),

  // Commands
  ICommand: Symbol.for('ICommand'),
  CommandsRegistryHelper: Symbol.for('CommandsRegistry'),

  // CallbackQueries
  ICallbackQuery: Symbol.for('ICallbackQuery'),
  CallbackQueriesRegistryHelper: Symbol.for('CallbackQueriesRegistryHelper'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
