import type {Config} from 'jest';

const config: Config = {
  verbose: true,
};

export default config;

module.exports = {
  testEnvironment: 'jsdom',
};