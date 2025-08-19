// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // Extensions to look for
  moduleFileExtensions: ['js', 'json'],
  // Test file patterns
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  // Coverage configuration
  collectCoverage: false,
  // Clear mocks between tests
  clearMocks: true,
}
