const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('fs');
const path = require('path');

// Read the tsconfig.json as a string and parse it to avoid potential JSON parsing errors
const tsconfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../tsconfig.json'), 'utf8'));

/** @type {import('jest').Config} */
const config = {
    rootDir: path.resolve(__dirname, '../'),
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts'],
    transform: {
        "^.+\\.(ts)$": "ts-jest"
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
};

module.exports = config;
