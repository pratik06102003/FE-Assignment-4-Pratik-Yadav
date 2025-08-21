import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer.component';
import { Grid } from 'antd';
import { EXPLORE_ITEMS, COMPANY_ITEMS, RESOURCE_ITEMS } from './Footer.constants';
import {
  expectMenuitemLinkToBeInTheDocumentWithCorrectHref,
  expectMenuitemsNotToBeInTheDocument,
  expectMenuitemsToBeInTheDocument,
  renderWithRouter,
} from '@utils/test.utils';

describe('Footer Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;
  mockedUseBreakpoint.mockReturnValue({ md: true });

  test('renders brand title and description', async () => {
    await renderWithRouter(<Footer />);

    expect(screen.getByRole('heading', { name: /blogsHQ/i })).toBeInTheDocument();
    expect(
      screen.getByText(/read, write, and share your thoughts with the world/i),
    ).toBeInTheDocument();
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
    expect(screen.getByText(new RegExp(`${year} BlogsHQ`))).toBeInTheDocument();
  });

  test('explore panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsNotToBeInTheDocument(EXPLORE_ITEMS);

    const panelButton = screen.getByRole('button', { name: /explore/i });
    expect(panelButton).toBeInTheDocument();

    await userEvent.click(panelButton);
    expectMenuitemsToBeInTheDocument(EXPLORE_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(EXPLORE_ITEMS);
  });

  test('company panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsNotToBeInTheDocument(COMPANY_ITEMS);

    const panelButton = screen.getByRole('button', { name: /company/i });
    expect(panelButton).toBeInTheDocument();

    await userEvent.click(panelButton);

    expectMenuitemsToBeInTheDocument(COMPANY_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(COMPANY_ITEMS);
  });

  test('resources panel is initially collapsed and expands on click', async () => {
    await renderWithRouter(<Footer />);

    expectMenuitemsNotToBeInTheDocument(RESOURCE_ITEMS);

    const panelButton = screen.getByRole('button', { name: /resources/i });
    expect(panelButton).toBeInTheDocument();

    await userEvent.click(panelButton);

    expectMenuitemsToBeInTheDocument(RESOURCE_ITEMS);
    expectMenuitemLinkToBeInTheDocumentWithCorrectHref(RESOURCE_ITEMS);
  });
});
