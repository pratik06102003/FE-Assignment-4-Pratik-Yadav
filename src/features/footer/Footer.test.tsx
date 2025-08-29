import { Grid } from 'antd';

import { Footer } from './Footer.component';
import { COMPANY_ITEMS, EXPLORE_ITEMS, RESOURCE_ITEMS } from './Footer.constants';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  expectMenuitemsToBeVisible,
  expectMenuitemsToHaveCorrectHref,
  expectMenuitemsToNotToBeVisible,
  renderWithRouter,
} from '@utils/test.utils';

describe('Footer Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;
  mockedUseBreakpoint.mockReturnValue({ md: true });

  test('renders brand title and description', async () => {
    await renderWithRouter(<Footer />);

    expect(screen.getByRole('heading', { name: /blogsHQ/i })).toBeVisible();
    expect(screen.getByText(/read, write, and share your thoughts with the world/i)).toBeVisible();
  });

  test('renders footer links with correct href', async () => {
    await renderWithRouter(<Footer />);

    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute('href', '/help');
  });

  test('renders current year dynamically', async () => {
    await renderWithRouter(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year} BlogsHQ`))).toBeVisible();
  });

  test('explore panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsToNotToBeVisible(EXPLORE_ITEMS);

    const panelButton = screen.getByRole('button', { name: /explore/i });
    expect(panelButton).toBeVisible();

    await userEvent.click(panelButton);
    await expectMenuitemsToBeVisible(EXPLORE_ITEMS);
    expectMenuitemsToHaveCorrectHref(EXPLORE_ITEMS);
  });

  test('company panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsToNotToBeVisible(COMPANY_ITEMS);

    const panelButton = screen.getByRole('button', { name: /company/i });
    expect(panelButton).toBeVisible();

    await userEvent.click(panelButton);

    await expectMenuitemsToBeVisible(COMPANY_ITEMS);
    expectMenuitemsToHaveCorrectHref(COMPANY_ITEMS);
  });

  test('resources panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsToNotToBeVisible(RESOURCE_ITEMS);

    const panelButton = screen.getByRole('button', { name: /resources/i });
    expect(panelButton).toBeVisible();

    await userEvent.click(panelButton);

    await expectMenuitemsToBeVisible(RESOURCE_ITEMS);
    expectMenuitemsToHaveCorrectHref(RESOURCE_ITEMS);
  });
});
