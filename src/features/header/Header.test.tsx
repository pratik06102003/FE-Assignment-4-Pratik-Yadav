import { Grid } from 'antd';

import { ROUTES } from '@constants/routes.constants';

import { Header } from './Header.component';
import { HEADER_DROPDOWN_ITEMS, HEADER_MENU_ITEMS } from './Header.constants';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  expectMenuitemsToBeVisible,
  expectMenuitemsToHaveCorrectHref,
  expectMenuitemsToNotToBeVisible,
  renderWithRouter,
} from '@utils/test.utils';

describe('Header Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;

  test('renders brand title, logo, search input, write button', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    renderWithRouter(<Header />);
    expect(screen.getByRole('heading', { name: /bhq/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /bhq/i })).toHaveAttribute('href', '/');

    await expectMenuitemsToBeVisible(HEADER_MENU_ITEMS.map((item) => item.label));
    expectMenuitemsToHaveCorrectHref(HEADER_MENU_ITEMS);

    const searchInput = screen.getByPlaceholderText(/search stories, authors/i);
    expect(searchInput).toBeVisible();

    const writeButton = screen.getByRole('link', { name: /write/i });
    expect(writeButton).toBeVisible();
    expect(writeButton).toHaveAttribute('href', ROUTES.CREATE_POST);

    await userEvent.type(searchInput, 'React Testing');
    expect(searchInput).toHaveValue('React Testing');
  });

  test('renders Dropdown on mobile', async () => {
    mockedUseBreakpoint.mockReturnValue({ sm: true });
    renderWithRouter(<Header />);
    const dropdownButton = screen.getByRole('button', { name: 'menu-fold' });
    expectMenuitemsToNotToBeVisible(HEADER_MENU_ITEMS.map((item) => item.label));
    expect(dropdownButton).toBeVisible();

    await userEvent.click(dropdownButton);
    await expectMenuitemsToBeVisible(HEADER_MENU_ITEMS.map((item) => item.label));
    expectMenuitemsToHaveCorrectHref(HEADER_MENU_ITEMS);
  });

  test('renders user avatar dropdown and opens on click', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    renderWithRouter(<Header />);
    const avatarButton = screen.getByRole('button', { name: 'user' });

    expectMenuitemsToNotToBeVisible(HEADER_DROPDOWN_ITEMS.map((item) => item.label));

    expect(avatarButton).toBeVisible();
    await userEvent.click(avatarButton);

    await expectMenuitemsToBeVisible(HEADER_DROPDOWN_ITEMS.map((item) => item.label));
    expectMenuitemsToHaveCorrectHref(HEADER_DROPDOWN_ITEMS);
  });
});
