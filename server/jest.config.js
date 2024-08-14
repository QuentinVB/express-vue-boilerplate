module.exports = {
  testTimeout: 10000,
  setupFiles: ["<rootDir>/tests/config/dotenv-config.js"],
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/*.tests.(js)"],
  collectCoverageFrom: ["src/**/*.{js}"],
  //preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/tests/config/jest.setup.js"]
};
