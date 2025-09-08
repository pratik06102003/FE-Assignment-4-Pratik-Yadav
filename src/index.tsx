import { ConfigProvider } from 'antd';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@store/root';

import { loadTheme } from './antTheme';
import { App } from './App';

import '@styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const theme = loadTheme();

createRoot(rootElement).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>,
);
