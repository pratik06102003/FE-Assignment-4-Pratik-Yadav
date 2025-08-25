<<<<<<< HEAD
import type * as Antd from 'antd';

import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

jest.mock('antd', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const antd = jest.requireActual('antd') as typeof Antd;
=======
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

type AntDModule = typeof import('antd');

jest.mock('antd', () => {
  const antd = jest.requireActual('antd') as AntDModule;
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
  return {
    ...antd,
    Grid: {
      ...antd.Grid,
<<<<<<< HEAD
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      useBreakpoint: jest.fn() as jest.Mock,
=======
      useBreakpoint: jest.fn(),
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
    },
  };
});

<<<<<<< HEAD
=======
jest.mock('@app/', () => ({
  firebaseApp: {},
  firebaseAuth: {},
  firestore: {},
}));

type ReactRouterDomModule = typeof import('react-router-dom');

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom') as ReactRouterDomModule;
  return { ...actual, useNavigate: jest.fn() };
});

>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
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
