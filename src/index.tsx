import { createRoot } from 'react-dom/client';
import { App } from './App';
import { FireBaseContextProvider } from './firebase';
import { ConfigProvider } from 'antd';
import { theme } from './theme';
import 'antd/dist/reset.css';
import './styles/main.scss';
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <FireBaseContextProvider>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </FireBaseContextProvider>,
);
