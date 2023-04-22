import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthContext.jsx";

import "./assets/styles.scss";
import App from "./components/App.jsx";
import store from "./slices/index.js";

const root = ReactDOM.createRoot(document.getElementById("chat"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </Provider>
);
