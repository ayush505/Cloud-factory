import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import './App.css';
import ErrorBoundary from './components/ErrorBoundry';
import AppRoutes from './AppRoutes';
import history from './history';

const getStore = () => {
  const allowedEnv = [
    'development',
    'staging',
    'qa1',
    'qa2',
    'qa3',
    'qa4',
    'qa5',
    'qa6',
    'qa7',
    'qa8',
    'qa9',
    'qa10',
    'qa11',
    'qa12'
  ];
  if (allowedEnv.includes(process.env.REACT_APP_ENV_NAME)) {
    return require('./redux/store/store.development').default; // eslint-disable-line global-require
  }
  return require('./redux/store/store').default; // eslint-disable-line global-require
};

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer newestOnTop />
      <AppBody>
        <Provider store={getStore()}>
          <Router history={history}>
            <AppRoutes />
          </Router>
        </Provider>
      </AppBody>
    </ErrorBoundary>
  );
}

export default App;
