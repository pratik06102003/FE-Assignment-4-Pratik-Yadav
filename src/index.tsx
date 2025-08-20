import { createRoot } from 'react-dom/client';
import { App } from './App';
import { FireBaseContextProvider } from './firebase';
import { ConfigProvider } from 'antd';
import './styles/main.scss';
import { loadTheme } from './theme';
const rootElement = document.getElementById('root') as HTMLElement;

const theme = loadTheme();

createRoot(rootElement).render(
  <FireBaseContextProvider>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </FireBaseContextProvider>,
);
