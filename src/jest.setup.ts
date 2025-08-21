/* eslint-disable */
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import type * as Antd from 'antd';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd') as typeof Antd;
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
      useBreakpoint: jest.fn() as jest.Mock,
    },
  };
});

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(() => ({
    matches: true,
    onchange: null,
  })) as jest.Mock,
});

if (!('TextEncoder' in globalThis)) {
  Object.defineProperty(globalThis, 'TextEncoder', { value: TextEncoder });
}
if (!('TextDecoder' in globalThis)) {
  Object.defineProperty(globalThis, 'TextDecoder', { value: TextDecoder });
}
