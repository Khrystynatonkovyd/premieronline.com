import type { Locator, Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component.js';
import { UiActions } from '../utils/ui-actions.js';

export class HomePage {
  readonly header: HeaderComponent;
  readonly upcomingEventsHeading: Locator;
  private readonly actions: UiActions;

  constructor(private readonly page: Page) {
    this.actions = new UiActions(page);
    this.header = new HeaderComponent(page, this.actions);
    this.upcomingEventsHeading = page.getByRole('heading', {
      name: 'Upcoming Events',
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.actions.goto('/', 'open the home page');
  }
}
