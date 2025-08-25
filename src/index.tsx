import { createRoot } from 'react-dom/client';
<<<<<<< HEAD

import { ConfigProvider } from 'antd';

import { App } from './App';
import { FireBaseContextProvider } from './firebase';
import { loadTheme } from './theme';

import './styles/main.scss';

=======
import './styles/main.scss';
import { ConfigProvider } from 'antd';
import { App } from './App';
import { loadTheme } from './theme';
import { Provider } from 'react-redux';
import { store } from './store/root';

>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
const rootElement = document.getElementById('root') as HTMLElement;
const theme = loadTheme();

createRoot(rootElement).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>,
);
