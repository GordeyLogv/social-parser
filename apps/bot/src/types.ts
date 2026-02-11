export const TYPES = {
  LoggerPort: Symbol.for('LoggerPort'),
  ConfigPort: Symbol.for('ConfigPort'),
  ExceptionFilterPort: Symbol.for('ExceptionFilterPort'),

  UserGreetingUseCase: Symbol.for('UserGreetingUseCase'),

  ICommand: Symbol.for('ICommand'),
  CommandsRegistryHelper: Symbol.for('CommandRegistryHelper'),

  ICallbackQuery: Symbol.for('ICallbackQuery'),
  CallbackQueryRegistryHelper: Symbol.for('CallbackQueryRegistryHelper'),

  IListenerMessage: Symbol.for('IListenerMessage'),
  ListerMessageRegistryHelper: Symbol.for('ListenerMessageRegistryHelper'),

  SessionMiddleware: Symbol.for('SessionMiddleware'),

  Grammy: Symbol.for('Grammy'),

  TelegramBot: Symbol.for('TelegramBot'),
};
