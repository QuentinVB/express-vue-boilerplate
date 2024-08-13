module.exports = {
  testTimeout: 10000,
  setupFiles: ["<rootDir>/tests/dotenv-config.js"],
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/*.tests.(js)"],
  collectCoverageFrom: ["src/**/*.{js}"],
  //preset: 'ts-jest',
};
