import { Grid } from 'antd';

import { Header } from './Header.component';
import { DROPDOWN_ITEMS, MENU_ITEMS } from './Header.constants';

import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  expectMenuitemsToBeVisible,
  expectMenuitemsToHaveCorrectHref,
  expectMenuitemsToNotToBeVisible,
  renderWithRouter,
} from '@utils/test.utils';

jest.mock('antd/es/_util/motion', () => false);
describe('Header Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;

  const renderHeader = async () => await act(() => renderWithRouter(<Header />));
  mockedUseBreakpoint.mockReturnValue({ md: true });

  test('renders brand title and logo', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    expect(screen.getByRole('heading', { name: /bhq/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /bhq/i })).toHaveAttribute('href', '/');
  });

  test('renders Menu on desktop', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    await expectMenuitemsToBeVisible(MENU_ITEMS);
    expectMenuitemsToHaveCorrectHref(MENU_ITEMS);
  });

  test('renders Dropdown on mobile', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: false });
    await renderHeader();
    const dropdownButton = screen.getByRole('button', { name: 'menu-fold' });
    expectMenuitemsToNotToBeVisible(MENU_ITEMS);
    expect(dropdownButton).toBeVisible();

    await userEvent.click(dropdownButton);
    await expectMenuitemsToBeVisible(MENU_ITEMS);
    expectMenuitemsToHaveCorrectHref(MENU_ITEMS);
  });

  test('renders search input and allows typing', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    const searchInput = screen.getByPlaceholderText(/search stories, authors/i);
    expect(searchInput).toBeVisible();

    await userEvent.type(searchInput, 'React Testing');
    expect(searchInput).toHaveValue('React Testing');
  });

  test('renders write button and responds to click', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();

    const writeButton = screen.getByRole('button', { name: /write/i });
    expect(writeButton).toBeVisible();

    const handleClick = jest.fn();
    writeButton.onclick = handleClick;

    await userEvent.click(writeButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders user avatar dropdown and opens on click', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    const avatarButton = screen.getByRole('button', { name: 'user' });

    expectMenuitemsToNotToBeVisible(DROPDOWN_ITEMS);

    expect(avatarButton).toBeInTheDocument();
    await userEvent.click(avatarButton);

    await expectMenuitemsToBeVisible(DROPDOWN_ITEMS);
    expectMenuitemsToHaveCorrectHref(DROPDOWN_ITEMS);
  });
});
