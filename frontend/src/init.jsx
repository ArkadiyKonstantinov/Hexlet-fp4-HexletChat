import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import BackendApiProvider from './contexts/BackendApiProvider.jsx';

const Init = () => {
  const i18n = i18next.createInstance();
  const socket = io('/', { autoConnect: false });
  const options = {
    resources,
    lng: 'ru',
    fallbackLng: ['ru', 'en'],
    interpolation: {
      escapeValue: false,
    },
  };
  i18n.use(initReactI18next).init(options);

  leoProfanity.loadDictionary();
  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: 'testenv',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <BackendApiProvider socket={socket}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BackendApiProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
