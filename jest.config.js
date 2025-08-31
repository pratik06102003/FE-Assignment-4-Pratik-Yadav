export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
