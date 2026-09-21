export interface Logger {
  info(message: string): void;
  error(message: string, error: unknown): void;
}

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.info(`[UI] ${message}`);
  }

  error(message: string, error: unknown): void {
    console.error(`[UI] ${message}`, error);
  }
}
