export const TOKENS = {
  // Ports
  LoggerPort: Symbol.for('LoggerPort'),
  ClockPort: Symbol.for('ClockPort'),
  UserRepositoryPort: Symbol.for('UserRepositoryPort'),

  // Logging
  ClockLogging: Symbol.for('ClockLogging'),
  PrismaLogging: Symbol.for('PrismaLogging'),
  UserRepositoryLogging: Symbol.for('UserRepositoryLogging'),

  // Use-cases
  AddUserUseCase: Symbol.for('AddUserUseCase'),
};
