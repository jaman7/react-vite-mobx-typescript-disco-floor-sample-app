module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^primereact/(.*)$': '<rootDir>/node_modules/primereact/$1',
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@views/(.*)$': '<rootDir>/src/view/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/public/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/index.tsx'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['\\.(css|scss)$'],
  reporters: [
    'default', // Keep the default Jest reporter
    [
      'jest-summary-reporter',
      {
        failuresOnly: false, // Set to true if you only want failed test details
        summaryStyle: 'verbose', // Options: `default`, `verbose`, `error`, `pass`
      },
    ],
    [
      'jest-html-reporter',
      {
        outputPath: 'test-results/test-report.html',
        pageTitle: 'Test Report',
        includeFailureMsg: true,
        includeSuiteFailure: true,
        includeConsoleLog: true,
      },
    ],
  ],
};
