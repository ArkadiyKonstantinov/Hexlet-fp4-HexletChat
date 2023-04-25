import React from "react";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthContext.jsx";
import SocketProvider from "./contexts/SocketContext.jsx";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import App from "./components/App.jsx";
import store from "./slices/index.js";
import leoProfanity from "leo-profanity";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";

const Init = () => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  };
  i18n.use(initReactI18next).init(options);

  leoProfanity.loadDictionary("ru");

  const rollbarConfig = {
    accessToken: "3f791afd456543599cac59744f899917",
    environment: "testenv",
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </SocketProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
