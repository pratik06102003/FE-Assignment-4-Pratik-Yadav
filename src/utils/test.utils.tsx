import { act, isValidElement, ReactElement, ReactNode } from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render, RenderOptions } from '@testing-library/react';
import { screen } from '@testing-library/react';

/**
 * Re-export everything from @testing-library/react
 * so tests can import from this file instead of two sources.
 */
export * from '@testing-library/react';

/**
 * Custom render function that wraps the UI in a MemoryRouter.
 * Useful for testing components that rely on react-router hooks
 * like useLocation, useNavigate, NavLink, etc.
 *
 * @param ui - ReactElement to render
 * @param options - Optional route and render options
 * @returns The result of RTL's render function
 */
export async function renderWithRouter(
  ui: ReactElement,
  { route = '/', ...options }: { route?: string } & RenderOptions = {},
) {
  return await act(() =>
    render(ui, {
      wrapper: ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>,
      ...options,
    }),
  );
}

/**
 * Extracts text from a ReactNode safely for testing purposes.
 * Supports plain strings or React elements with string children.
 *
 * @param label - ReactNode (string or JSX element)
 * @returns The extracted text
 */
export const getLabelText = (label: ReactNode): string => {
  if (typeof label === 'string') {
    return label;
  }

  if (isValidElement(label)) {
    const element = label as ReactElement<{ children?: ReactNode }>;
    const children = element.props.children;

    if (typeof children === 'string') {
      return children;
    }
  }

  throw new Error(`Unsupported label type: ${JSON.stringify(label)}`);
};

/**
 * Asserts that all menu items in the given array exist in the DOM.
 * Useful for testing dropdowns or navigation menus.
 *
 * @param items - Array of objects with a `label` property
 */
export const expectMenuitemsToBeInTheDocument = (items: { label: ReactNode }[]) => {
  items.forEach((item) => {
    const labelText = getLabelText(item.label);

    expect(
      screen.queryByRole('menuitem', { name: new RegExp(labelText, 'i') }),
    ).toBeInTheDocument();
  });
};

/**
 * Asserts that all menu items in the given array do NOT exist in the DOM.
 * Useful for testing hidden menus or conditional rendering.
 *
 * @param items - Array of objects with a `label` property
 */
export const expectMenuitemsNotToBeInTheDocument = (items: { label: ReactNode }[]) => {
  items.forEach((item) => {
    const labelText = getLabelText(item.label);

    expect(
      screen.queryByRole('menuitem', {
        name: new RegExp(labelText, 'i'),
      }),
    ).not.toBeInTheDocument();
  });
};

/**
 * Asserts that each menu item renders as a link (<a> or <NavLink>)
 * and has the correct href.
 *
 * @param items - Array of objects with `label` and `to` properties
 */
export const expectMenuitemLinkToBeInTheDocumentWithCorrectHref = (
  items: { label: ReactNode; to: string }[],
) => {
  items.forEach((item) => {
    const link = screen.getByRole('link', { name: new RegExp(getLabelText(item.label), 'i') });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.to);
  });
};
