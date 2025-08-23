import type * as Antd from 'antd';

import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

jest.mock('antd', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const antd = jest.requireActual('antd') as typeof Antd;
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      useBreakpoint: jest.fn() as jest.Mock,
    },
  };
});

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(() => ({
    matches: true,
    onchange: null,
  })),
});

if (!('TextEncoder' in globalThis)) {
  Object.defineProperty(globalThis, 'TextEncoder', { value: TextEncoder });
}
if (!('TextDecoder' in globalThis)) {
  Object.defineProperty(globalThis, 'TextDecoder', { value: TextDecoder });
}
