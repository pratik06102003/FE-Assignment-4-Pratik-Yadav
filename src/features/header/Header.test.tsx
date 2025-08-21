import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header.component';
import { MENU_ITEMS, DROPDOWN_ITEMS } from './Header.constants';
import { Grid } from 'antd';
import {
  expectMenuitemLinkToBeInTheDocumentWithCorrectHref,
  expectMenuitemsNotToBeInTheDocument,
  expectMenuitemsToBeInTheDocument,
  renderWithRouter,
} from '@utils/test.utils';

describe('Header Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;

  const renderHeader = async () => await act(() => renderWithRouter(<Header />));
  mockedUseBreakpoint.mockReturnValue({ md: true });

  test('renders brand title and logo', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    expect(screen.getByRole('heading', { name: /bhq/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bhq/i })).toHaveAttribute('href', '/');
  });

  test('renders Menu on desktop', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    expectMenuitemsToBeInTheDocument(MENU_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(MENU_ITEMS);
  });

  test('renders Dropdown on mobile', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: false });
    await renderHeader();
    const dropdownButton = screen.getByRole('button', { name: 'menu-fold' });
    expectMenuitemsNotToBeInTheDocument(MENU_ITEMS);
    expect(dropdownButton).toBeInTheDocument();

    await userEvent.click(dropdownButton);
    expectMenuitemsToBeInTheDocument(MENU_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(MENU_ITEMS);
  });

  test('renders search input and allows typing', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    const searchInput = screen.getByPlaceholderText(/search stories, authors/i);
    expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, 'React Testing');
    expect(searchInput).toHaveValue('React Testing');
  });

  test('renders write button and responds to click', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();

    const writeButton = screen.getByRole('button', { name: /write/i });
    expect(writeButton).toBeInTheDocument();

    const handleClick = jest.fn();
    writeButton.onclick = handleClick;

    await userEvent.click(writeButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders user avatar dropdown and opens on click', async () => {
    mockedUseBreakpoint.mockReturnValue({ md: true });
    await renderHeader();
    const avatarButton = screen.getByRole('button', { name: 'user' });

    expectMenuitemsNotToBeInTheDocument(DROPDOWN_ITEMS);

    expect(avatarButton).toBeInTheDocument();
    await userEvent.click(avatarButton);

    expectMenuitemsToBeInTheDocument(DROPDOWN_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(DROPDOWN_ITEMS);
  });
});
