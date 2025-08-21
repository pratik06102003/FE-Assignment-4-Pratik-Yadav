import { createRoot } from 'react-dom/client';

import { ConfigProvider } from 'antd';

import { App } from './App';
import { FireBaseContextProvider } from './firebase';
import { loadTheme } from './theme';

import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const theme = loadTheme();

createRoot(rootElement).render(
  <FireBaseContextProvider>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </FireBaseContextProvider>,
);
