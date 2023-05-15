/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import store from './store/store';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import DemoData from './DemoData';
import { BrowserRouter } from 'react-router-dom';
<link href="path/to/node_modules/normalize.css/normalize.css" rel="stylesheet" />;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Provider store={store}>
      <BrowserRouter>
        <DemoData />
        <App />
      </BrowserRouter>
    </Provider>
  </RecoilRoot>
);
