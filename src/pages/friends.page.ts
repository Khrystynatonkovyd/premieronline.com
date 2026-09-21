import type { Locator, Page } from '@playwright/test';
import { visitorData, type FriendTab } from '../test-data/visitor-data.js';
import { UiActions } from '../utils/ui-actions.js';
import type { HeaderComponent } from './components/header.component.js';

export class FriendsPage {
  readonly breadcrumb: Locator;
  readonly emptyDescription: Locator;
  readonly emptyMessage: Locator;
  private readonly actions: UiActions;

  constructor(
    private readonly page: Page,
    private readonly header: HeaderComponent,
  ) {
    this.actions = new UiActions(page);

    // The breadcrumb has no accessible name or test ID; its application class is the stable
    // contract that separates it from other lists on the page.
    this.breadcrumb = page.locator('ul.uk-breadcrumb');
    this.emptyDescription = page.getByText(visitorData.friends.emptyDescription, { exact: true });
    // The empty-state paragraph has no accessible name or test ID; these stable application classes
    // identify the message while its expected text remains in the test-data layer.
    this.emptyMessage = page.locator('p.uk-text-center.uk-text-muted.uk-text-large');
  }

  async open(): Promise<void> {
    await this.actions.click(this.header.friendsLink, 'open Visitor friends');
  }

  breadcrumbItem(name: string): Locator {
    return this.breadcrumb.getByText(name, { exact: true });
  }

  async openTab(tab: FriendTab): Promise<void> {
    const tabLink = this.page.getByRole('link').filter({ hasText: tab.name });
    await this.actions.click(tabLink, `open the ${tab.name} friends tab`);
  }
}
