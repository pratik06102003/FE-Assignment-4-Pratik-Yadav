import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';

import { store } from './store/root';
import { App } from './App';
import { loadTheme } from './theme';

import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const theme = loadTheme();

createRoot(rootElement).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>,
);
