import { MemoryRouter } from 'react-router-dom';

import type { ReactElement } from 'react';

import { render, screen, waitFor } from '@testing-library/react';

/**
 * Custom render function that wraps the UI in a MemoryRouter.
 * Useful for testing components that rely on react-router hooks
 * like useLocation, useNavigate, NavLink, etc.
 *
 * @param component - ReactElement to render
 * @returns The result of RTL's render function
 */
export const renderWithRouter = (component: ReactElement) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

/**
 * Asserts that all menu items in the given array exist in the DOM.
 * Useful for testing dropdowns or navigation menus.
 *
 * @param labels - Array of string defining the label
 */
export const expectMenuitemsToBeVisible = async (labels: string[]) => {
  for (const label of labels) {
    const el = await screen.findByRole('menuitem', { name: new RegExp(label, 'i') });
    await waitFor(() => expect(el).toBeVisible());
  }
};

/**
 * Asserts that all menu items in the given array do NOT exist in the DOM.
 * Useful for testing hidden menus or conditional rendering.
 *
 * @param labels - Array of string defining the label
 */
export const expectMenuitemsToNotToBeVisible = (labels: string[]) => {
  labels.forEach((label) => {
    const menuItem = screen.queryByRole('menuitem', {
      name: new RegExp(label, 'i'),
    });

    expect(menuItem).toBeNull();
  });
};

/**
 * Asserts that each menu item renders as a link (<a> or <NavLink>)
 * and has the correct href.
 *
 * @param items - Array of objects with `label` and `to` properties
 */
export const expectMenuitemsToHaveCorrectHref = (items: { label: string; to: string }[]) => {
  items.forEach((item) => {
    const link = screen.getByRole('link', { name: new RegExp(item.label, 'i') });
    expect(link).toHaveAttribute('href', item.to === '#' ? '/' : item.to);
  });
};
