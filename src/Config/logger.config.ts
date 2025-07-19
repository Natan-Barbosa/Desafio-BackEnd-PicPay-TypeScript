import { ConsoleLoggerOptions } from '@nestjs/common';

export const loggerConfig: ConsoleLoggerOptions = {
  json: true,
  logLevels: ['error', 'debug', 'fatal', 'log', 'warn'],
  colors: true,
};
