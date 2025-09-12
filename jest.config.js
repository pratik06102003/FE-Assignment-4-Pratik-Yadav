export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/shared/constants/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@hooks/(.*)$': '<rootDir>/src/core/hooks/$1',
    '^@app/(.*)$': '<rootDir>/src/core/app/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
