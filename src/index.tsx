import { ConfigProvider } from 'antd';

import { createRoot } from 'react-dom/client';

import { loadTheme } from './antTheme';
import { App } from './App';

import '@styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const theme = loadTheme();

createRoot(rootElement).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>,
);
