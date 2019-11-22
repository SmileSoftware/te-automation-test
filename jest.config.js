module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  roots: ['<rootDir>'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules'
  ],
  testRegex: '(/test/(?!_).*|(\\.|/)(test|spec))\\.tsx?$',
  moduleDirectories: [
    '<rootDir>/node_modules',
    '<rootDir>'
  ],
  setupFilesAfterEnv: ['./test/_setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node'
};
