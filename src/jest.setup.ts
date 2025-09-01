import type * as AntDModuleType from 'antd';

import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

jest.mock('antd', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const antd = jest.requireActual('antd') as typeof AntDModuleType;
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
      useBreakpoint: jest.fn(),
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
