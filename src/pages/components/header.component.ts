import type { Locator, Page } from '@playwright/test';
import type { UiActions } from '../../utils/ui-actions.js';

export class HeaderComponent {
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly eventsLink: Locator;
  readonly ratingsLink: Locator;
  readonly helpLink: Locator;
  readonly arabicLink: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly visitorAccountLink: Locator;
  readonly friendsLink: Locator;
  readonly messagesLink: Locator;
  readonly subscriptionsLink: Locator;
  readonly signOutLink: Locator;

  constructor(
    private readonly page: Page,
    private readonly actions: UiActions,
  ) {
    const navigation = page.getByRole('navigation');
    this.logo = navigation.getByRole('link', { name: 'Premiere Online', exact: true });
    this.searchInput = navigation
      .getByPlaceholder('Search by Event Name or Organiser', { exact: true })
      .first();
    this.eventsLink = navigation.getByRole('link', { name: 'Events', exact: true });
    this.ratingsLink = navigation.getByRole('link', { name: 'Ratings', exact: true });
    this.helpLink = navigation.getByRole('link', { name: 'Help', exact: true });
    this.arabicLink = navigation.getByRole('link', { name: 'عربى', exact: true });
    this.signInLink = navigation.getByRole('link', { name: 'Sign in', exact: true });
    this.createAccountLink = navigation.getByRole('link', {
      name: 'Create Account',
      exact: true,
    });

    // The authenticated navigation has no accessible name or test ID; its stable sub-nav class is
    // the narrowest application contract available for separating it from the primary navigation.
    const visitorNavigation = page.locator('nav.sub-nav');
    this.visitorAccountLink = visitorNavigation.getByRole('link', { name: /Account$/ });
    this.friendsLink = visitorNavigation.getByRole('link', { name: 'Friends', exact: true });
    this.messagesLink = visitorNavigation.getByRole('link', { name: 'Messages', exact: true });
    this.subscriptionsLink = visitorNavigation.getByRole('link', {
      name: 'Subscriptions',
      exact: true,
    });
    this.signOutLink = page.getByRole('link', { name: 'Sign out', exact: true });
  }

  async openSignIn(): Promise<void> {
    await this.actions.click(this.signInLink, 'open the sign-in page from the header');
  }

  async search(query: string): Promise<void> {
    await this.actions.fill(this.searchInput, '', 'clear the event search');
    await this.actions.pressSequentially(this.searchInput, query, 'enter the event search query');
  }

  searchResults(): Locator {
    return this.page.locator('#s_ext_events');
  }

  noResultsMessage(): Locator {
    return this.page.getByText("We couldn't find any events at the moment.", { exact: false });
  }
}
