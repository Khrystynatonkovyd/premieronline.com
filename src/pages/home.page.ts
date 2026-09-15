import type { Locator, Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component.js';

export class HomePage {
  readonly header: HeaderComponent;
  readonly upcomingEventsHeading: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.upcomingEventsHeading = page.getByRole('heading', {
      name: 'Upcoming Events',
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }
}
