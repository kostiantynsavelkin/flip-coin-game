import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// material
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { UseWalletProvider } from 'use-wallet';

// routes
import routes, { renderRoutes } from './routes';
// redux
import { store, persistor } from './redux/store';
// theme
import ThemeConfig from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';

// Using for Auth (Check doc https://minimals.cc/docs/authentication)
// import FirebaseProvider from './components/authentication/FirebaseProvider';

// ----------------------------------------------------------------------

const history = createBrowserHistory();

export default function App() {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeConfig>
            <RtlLayout>
              <UseWalletProvider
                chainId={parseInt(process.env.REACT_APP_CHAIN_ID, 10)}
                connectors={{
                  walletconnect: {
                    rpcUrl: process.env.REACT_APP_RPCURL
                  }
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <NotistackProvider>
                    <Router history={history}>
                      <ScrollToTop />
                      <GoogleAnalytics />
                      {renderRoutes(routes)}
                    </Router>
                  </NotistackProvider>
                </LocalizationProvider>
              </UseWalletProvider>
            </RtlLayout>
          </ThemeConfig>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
}
