import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthContext.jsx";

import "./styles.scss";
import App from "./components/App.jsx";
import store from "./slices/index.js";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("chat"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </AuthProvider>
  </Provider>
);
