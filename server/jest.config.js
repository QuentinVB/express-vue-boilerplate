module.exports = {
  testTimeout: 10000,
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/*.tests.(js)"],
  collectCoverageFrom: ["src/**/*.{js}"],
  setupFiles: ["<rootDir>/tests/config/dotenv-config.js"],
  setupFilesAfterEnv:[
    "<rootDir>/tests/config/setupEachTests.js",
    "<rootDir>/tests/config/teardownEachTests.js"]
};
