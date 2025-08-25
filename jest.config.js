export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupFiles: ['whatwg-fetch'],
};
