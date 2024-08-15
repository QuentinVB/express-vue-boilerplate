module.exports = {
  testTimeout: 10000,
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/*.tests.(js)"],
  collectCoverageFrom: ["src/**/*.{js}"],
  setupFiles: ["<rootDir>/tests/config/dotenv-config.js"],
  globalSetup: "<rootDir>/tests/config/globalSetup.js",
  globalTeardown: "<rootDir>/tests/config/globalTeardown.js",
  setupFilesAfterEnv:[
    "<rootDir>/tests/config/setupTests.js",
  ],
  collectCoverage:true,
  collectCoverageFrom:[
    '**/*.{js,jsx}',
    '!**/tests/**',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
  coverageDirectory:"<rootDir>/coverage"
};
