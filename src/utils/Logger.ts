/* eslint-disable no-console */
interface ILog {
  [key: string]: unknown;
}

/**
 * Mock logger
 */
class Logger {
  public static error(message: string, log: ILog = {}): void {
    console.error(message, {...log, service_name: process.env.name});
  }

  public static warn(message: string, log: ILog = {}): void {
    console.warn(message, {...log, service_name: process.env.name});
  }

  public static info(message: string, log: ILog = {}): void {
    console.log(message, {...log, service_name: process.env.name});
  }
}

export {Logger};
