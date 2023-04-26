import React from 'react';
import ReactDOM from 'react-dom/client';
import Init from './init';

import './assets/styles.scss';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = Init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
