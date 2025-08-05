import { Logger } from '@nestjs/common';

/**
 * Service de logging pour les scripts standalone
 */
export class ScriptLogger {
  private logger: Logger;

  constructor(context: string) {
    this.logger = new Logger(context);
  }

  info(message: string, ...args: unknown[]) {
    this.logger.log(message, ...args);
  }

  error(message: string, error?: any) {
    this.logger.error(message, error?.stack || error);
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  verbose(message: string, ...args: unknown[]) {
    this.logger.verbose(message, ...args);
  }
}
