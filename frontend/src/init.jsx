import React from "react";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthContext.jsx";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import App from "./components/App.jsx";
import store from "./slices/index.js";
import leoProfanity from "leo-profanity";

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

  leoProfanity.loadDictionary('ru');

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default Init;
