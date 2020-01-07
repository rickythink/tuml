const pack = require('./package')

module.exports = {
  displayName: pack.name,
  name: pack.name,
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // https://github.com/gregberge/svgr/issues/83#issuecomment-408869426
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgrMock.js'
  }
}
