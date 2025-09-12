import { APP_COPYRIGHT_YEAR } from '@constants/common.constant';
import { renderWithRouter } from '@utils/test.utils';

import { Footer } from './Footer.component';

import { screen } from '@testing-library/react';

describe('Footer Component', () => {
  test('renders all component correctly (Title, paragraph, links and copyright)', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole('heading', { name: /blogsHQ/i })).toBeVisible();
    expect(screen.getByText(/read, write, and share your thoughts with the world/i)).toBeVisible();

    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute('href', '/');

    expect(screen.getByText(new RegExp(`${APP_COPYRIGHT_YEAR} BlogsHQ`))).toBeVisible();
  });
});
