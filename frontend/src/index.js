import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles.scss';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import store from './slices/index.js';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </Provider>
);
