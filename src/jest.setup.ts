/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

type AntDModule = typeof import('antd');

jest.mock('antd', () => {
  const antd = jest.requireActual('antd') as AntDModule;
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
