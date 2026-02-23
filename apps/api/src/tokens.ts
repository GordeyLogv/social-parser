export const TOKENS = {
  // Ports
  LoggerPort: Symbol.for('LoggerPort'),
  ClockPort: Symbol.for('ClockPort'),
  UserRepositoryPort: Symbol.for('UserRepositoryPort'),

  // Logging
  ClockLogging: Symbol.for('ClockLogging'),
  PrismaLogging: Symbol.for('PrismaLogging'),
  UserRepositoryLogging: Symbol.for('UserRepositoryLogging'),
  ExceptionFilterApiLogging: Symbol.for('ExceptionFilterApiLogging'),

  UserControllerLogging: Symbol.for('UserControllerLogging'),
  UserServiceLogging: Symbol.for('UserServiceLogging'),

  AddUserUseCaseLogging: Symbol.for('AddUserUseCaseLogging'),

  // Use-cases
  AddUserUseCase: Symbol.for('AddUserUseCase'),
};
