import type { Locator, Page } from '@playwright/test';
import { visitorData } from '../test-data/visitor-data.js';
import { UiActions } from '../utils/ui-actions.js';
import type { HeaderComponent } from './components/header.component.js';

export class PersonalRegistrationsPage {
  readonly breadcrumb: Locator;
  readonly breadcrumbAccountLink: Locator;
  readonly breadcrumbCurrent: Locator;
  readonly registrationsSection: Locator;
  readonly registrationsTable: Locator;
  readonly tableHeaders: Locator;
  readonly emptyTitle: Locator;
  readonly emptyDescription: Locator;
  private readonly actions: UiActions;

  constructor(
    page: Page,
    private readonly header: HeaderComponent,
  ) {
    this.actions = new UiActions(page);

    // These elements have no accessible container names or test IDs; the application classes are
    // the stable contracts used to distinguish the breadcrumb and registrations table.
    this.breadcrumb = page.locator('ul.uk-breadcrumb');
    this.breadcrumbAccountLink = this.breadcrumb.getByRole('link', {
      name: visitorData.personalRegistrations.accountName,
    });
    this.breadcrumbCurrent = this.breadcrumb.getByText(
      visitorData.personalRegistrations.breadcrumbCurrent,
      { exact: true },
    );
    this.registrationsSection = page.getByRole('link', {
      name: visitorData.personalRegistrations.activeSection,
      exact: true,
    });
    this.registrationsTable = page.locator('table.tbl-trans');
    this.tableHeaders = this.registrationsTable.getByRole('columnheader');
    this.emptyTitle = page.getByRole('heading', {
      name: visitorData.personalRegistrations.emptyTitle,
      exact: true,
    });
    this.emptyDescription = this.registrationsTable.getByText(
      visitorData.personalRegistrations.emptyDescription,
    );
  }

  async open(): Promise<void> {
    await this.actions.click(this.header.visitorAccountLink, 'open Visitor registrations');
  }
}
