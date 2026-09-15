import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly eventsLink: Locator;
  readonly ratingsLink: Locator;
  readonly helpLink: Locator;
  readonly arabicLink: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;

  constructor(private readonly page: Page) {
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
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill('');
    await this.searchInput.pressSequentially(query);
  }

  searchResults(): Locator {
    return this.page.locator('#s_ext_events');
  }

  noResultsMessage(): Locator {
    return this.page.getByText("We couldn't find any events at the moment.", { exact: false });
  }
}
