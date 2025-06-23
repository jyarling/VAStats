import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app/src'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/app/tsconfig.test.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  setupFiles: ['<rootDir>/jest.setup.ts']
}

export default config
