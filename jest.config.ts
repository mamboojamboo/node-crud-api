import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
	moduleNameMapper: { 'src/(.*)': '<rootDir>/src/$1' },
	moduleDirectories: ['node_modules', 'src'],
};

export default config;
