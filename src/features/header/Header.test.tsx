import { Grid } from 'antd';

import { ROUTES } from '@constants/routes.constants';
import {
  expectMenuitemsToBeVisible,
  expectMenuitemsToHaveCorrectHref,
  expectMenuitemsToNotToBeVisible,
  renderWithRouter,
} from '@utils//test.utils';

import { HEADER_MENU_ITEMS } from './Header.constants';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockUseAuth = jest.fn();
jest.mock('@hooks//useAuth.hook', () => ({
  useAuth: mockUseAuth,
}));

const mockSignout = jest.fn();
mockUseAuth.mockImplementation(() => ({
  signoutService: mockSignout,
}));

import { Header } from './Header.component';
describe('Header Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;

  test('renders brand title, logo, search input, write button', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    renderWithRouter(<Header />);
    expect(screen.getByRole('heading', { name: /bhq/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /bhq/i })).toHaveAttribute('href', '/');

    await expectMenuitemsToBeVisible(HEADER_MENU_ITEMS.map((item) => item.label));
    expectMenuitemsToHaveCorrectHref(HEADER_MENU_ITEMS);

    const writeButton = screen.getByRole('link', { name: /write/i });
    expect(writeButton).toBeVisible();
    expect(writeButton).toHaveAttribute('href', ROUTES.CREATE_POST);

    const signoutButton = screen.getByRole('button', { name: /signout/i });
    expect(signoutButton).toBeVisible();
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

  test('calls signout service on clicking signout', async () => {
    mockedUseBreakpoint.mockReturnValue({ sm: true });
    renderWithRouter(<Header />);
    const signoutButton = screen.getByRole('button', { name: /signout/i });
    await userEvent.click(signoutButton);

    expect(mockSignout).toHaveBeenCalledTimes(1);
  });
});
