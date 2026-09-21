import type { Locator, Page } from '@playwright/test';
import { ConsoleLogger, type Logger } from './logger.js';

type SelectOptionValue = Parameters<Locator['selectOption']>[0];
type SelectOptionOptions = Parameters<Locator['selectOption']>[1];

export class UiActions {
  constructor(
    private readonly page: Page,
    private readonly logger: Logger = new ConsoleLogger(),
  ) {}

  async goto(url: string, description = `navigate to ${url}`): Promise<void> {
    await this.execute(description, async () => {
      await this.page.goto(url);
    });
  }

  async click(locator: Locator, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.click();
    });
  }

  async fill(locator: Locator, value: string, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.fill(value);
    });
  }

  async press(locator: Locator, key: string, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.press(key);
    });
  }

  async pressSequentially(locator: Locator, value: string, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.pressSequentially(value);
    });
  }

  async check(locator: Locator, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.check();
    });
  }

  async uncheck(locator: Locator, description: string): Promise<void> {
    await this.execute(description, async () => {
      await locator.uncheck();
    });
  }

  async selectOption(
    locator: Locator,
    values: SelectOptionValue,
    description: string,
    options?: SelectOptionOptions,
  ): Promise<string[]> {
    return this.execute(description, () => locator.selectOption(values, options));
  }

  async hover(locator: Locator, description: string): Promise<void> {
    await this.execute(description, async () => {
      const isEnabled = await this.enable(
        locator,
        `check whether the target is enabled before: ${description}`,
      );

      if (!isEnabled) {
        throw new Error(`Cannot hover over a disabled target: ${description}`);
      }

      await locator.hover();
    });
  }

  async enable(locator: Locator, description: string): Promise<boolean> {
    return this.execute(description, () => locator.isEnabled());
  }

  async visible(locator: Locator, description: string): Promise<boolean> {
    return this.execute(description, () => locator.isVisible());
  }

  private async execute<T>(description: string, action: () => Promise<T>): Promise<T> {
    this.logger.info(`START: ${description}`);

    try {
      const result = await action();
      this.logger.info(`PASS: ${description}`);
      return result;
    } catch (error: unknown) {
      this.logger.error(`FAIL: ${description}`, error);
      throw new Error(`UI action failed: ${description}`, { cause: error });
    }
  }
}
