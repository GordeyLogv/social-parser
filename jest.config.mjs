/** @type {import('jest').Config} */

export default {
  clearMocks: true,
  projects: [
    {
      displayName: 'core',
      rootDir: '.',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/core/**/*.spec.ts'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.base.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'json'],
    },
    {
      displayName: 'bot',
      rootDir: '.',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/bot/**/*.spec.ts'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.base.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'json'],
    },
    {
      displayName: 'api',
      rootDir: '.',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/api/**/*.spec.ts'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.base.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'json'],
    },
  ],
};
