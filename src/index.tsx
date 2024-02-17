import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom/client';
import App from './app';
import Store from './store/Store';
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider Store={Store}>
    <App />
  </Provider>
);
