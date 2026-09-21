import type { Locator, Page } from '@playwright/test';
import { UiActions } from '../utils/ui-actions.js';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  private readonly actions: UiActions;

  constructor(private readonly page: Page) {
    this.actions = new UiActions(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email address', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    // The page exposes two identically named buttons; the semantic form element is the stable
    // contract that distinguishes the login submit button from the header's Sign in button.
    this.submitButton = page.locator('form').getByRole('button', { name: 'Sign in', exact: true });
  }

  async open(): Promise<void> {
    await this.actions.goto('/action/dologin', 'open the sign-in page');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.actions.fill(this.emailInput, email, 'fill the Visitor email');
    await this.actions.fill(this.passwordInput, password, 'fill the Visitor password');
    await this.actions.click(this.submitButton, 'submit the sign-in form');
  }
}
