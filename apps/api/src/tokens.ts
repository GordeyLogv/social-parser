export const TOKENS = {
  // Ports
  LoggerPort: Symbol.for('LoggerPort'),
  ClockPort: Symbol.for('ClockPort'),
  UserRepositoryPort: Symbol.for('UserRepositoryPort'),
  AccountRepositoryPort: Symbol.for('AccountRepositoryPort'),
  ParserApiPort: Symbol.for('ParserApiPort'),

  // Logging
  ClockLogging: Symbol.for('ClockLogging'),
  PrismaLogging: Symbol.for('PrismaLogging'),
  UserRepositoryLogging: Symbol.for('UserRepositoryLogging'),
  AccountRepositoryLogging: Symbol.for('AccountRepositoryLogging'),
  ExceptionFilterApiLogging: Symbol.for('ExceptionFilterApiLogging'),
  ParserApiLogging: Symbol.for('ParserApiLogging'),

  UserControllerLogging: Symbol.for('UserControllerLogging'),
  AccountControllerLogging: Symbol.for('AccountControllerLogging'),

  UserServiceLogging: Symbol.for('UserServiceLogging'),
  AccountServiceLogging: Symbol.for('AccountServiceLogging'),

  GetUserUseCaseLogging: Symbol.for('GetUserUseCaseLogging'),
  AddUserUseCaseLogging: Symbol.for('AddUserUseCaseLogging'),

  AddAccountUseCaseLogging: Symbol.for('AddAccountUseCaseLogging'),

  // Use-cases
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  AddUserUseCase: Symbol.for('AddUserUseCase'),

  AddAccountUseCase: Symbol.for('AddAccountUseCase'),
};
