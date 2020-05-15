const {
  defaults: tsjPreset
} = require('ts-jest/presets')

module.exports = {
  preset: '@shelf/jest-mongodb',
  // ...some other non related config values...
  transform: tsjPreset.transform,
  testEnvironment: "node",
  // globalSetup: './src/testSetup.js',
  // globalTeardown: './src/testTeardown.js',
  testTimeout: 60000
}