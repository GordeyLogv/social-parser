export const TOKENS = {
  // Adapters
  LoggerPort: Symbol.for('LoggerPort'),
  ConfigPort: Symbol.for('ConfigPort'),
  ExceptionFilterPort: Symbol.for('ExceptionFilterPort'),
  ServerApiPort: Symbol.for('UserApiPort'),

  // Logging
  TelegramBotLogger: Symbol.for('TelegramBotLogger'),

  ConfigLogger: Symbol.for('ConfigLogger'),
  ExceptionFilterLogger: Symbol.for('ExceptionFilterLogger'),
  ServerApiLogger: Symbol.for('UserApiLogger'),

  SessionMiddlewareLogger: Symbol.for('SessionMiddlewareLogger'),

  StartCommandLogger: Symbol.for('StartCommandLogger'),

  MenuCallbackQueryLogger: Symbol.for('MenuCallbackQueryLogger'),
  HelpCallbackQueryLogger: Symbol.for('HelpCallbackQueryLogger'),
  AddAccountCallbackQueryLogger: Symbol.for('AddAccountCallbackQueryLogger'),

  MiddlewaresRegistryLogger: Symbol.for('MiddlewaresRegistryLogger'),
  CommandsRegistryLogger: Symbol.for('CommandsRegistryLogger'),
  CallbackQueriesRegistryLogger: Symbol.for('CallbackQueriesRegistryLogger'),

  // Middlewares
  IMiddleware: Symbol.for('IMiddleware'),
  MiddlewaresRegistryHelper: Symbol.for('MiddlewaresRegistryHelper'),

  // Commands
  ICommand: Symbol.for('ICommand'),
  CommandsRegistryHelper: Symbol.for('CommandsRegistry'),

  // CallbackQueries
  ICallbackQuery: Symbol.for('ICallbackQuery'),
  CallbackQueriesRegistryHelper: Symbol.for('CallbackQueriesRegistryHelper'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
