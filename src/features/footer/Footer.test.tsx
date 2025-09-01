import { Grid } from 'antd';

import { APP_COPYRIGHT_YEAR } from '@constants/common.constant';

import { Footer } from './Footer.component';

import { screen } from '@testing-library/react';
import { renderWithRouter } from '@utils/test.utils';

describe('Footer Component', () => {
  const mockedUseBreakpoint = Grid.useBreakpoint as jest.Mock;
  mockedUseBreakpoint.mockReturnValue({ md: true });

  test('renders all component correctly (Title, paragraph, links and copyright)', async () => {
    await renderWithRouter(<Footer />);

    expect(screen.getByRole('heading', { name: /blogsHQ/i })).toBeVisible();
    expect(screen.getByText(/read, write, and share your thoughts with the world/i)).toBeVisible();

    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute('href', '/help');

    expect(screen.getByText(new RegExp(`${APP_COPYRIGHT_YEAR} BlogsHQ`))).toBeVisible();
  });
});
