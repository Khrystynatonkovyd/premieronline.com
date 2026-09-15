import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole('textbox', { name: 'Email address', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Sign in', exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('/action/dologin');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
