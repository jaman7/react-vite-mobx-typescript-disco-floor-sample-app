import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { PrimeReactProvider } from 'primereact/api';
import RootStore from './store/RootStore';
import ErrorBoundary from './shared/ErrorBoundary';
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider RootStore={RootStore}>
    <PrimeReactProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PrimeReactProvider>
  </Provider>
);
