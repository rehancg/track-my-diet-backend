import { Logger } from '@nestjs/common';

class LoggerManager {
  private readonly logger: Logger = new Logger();

  private static loggerManager: LoggerManager;

  private constructor() {}

  public log(msg: string, context?: string) {
    this.logger.log(`[INFO] :: ${msg}`, context);
  }
  public error(msg: string, context?: string) {
    this.logger.error(`[ERROR] :: ${msg}`, context);
  }
  public static getInstance(): LoggerManager {
    if (!LoggerManager.loggerManager) {
      LoggerManager.loggerManager = new LoggerManager();
    }
    return LoggerManager.loggerManager;
  }
}

export { LoggerManager as Logger };
