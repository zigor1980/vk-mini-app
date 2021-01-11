import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { BrowserRouter as Router } from 'react-router-dom';

import { ViewProvider } from 'context/viewContext';
import { UserProvider } from 'context/userContext';
import { LaunchParamsProvider } from 'context/launchParamsContext';

import App from './App';

import './styles.scss';
bridge.send('VKWebAppInit');

ReactDOM.render(
  <Router>
    <LaunchParamsProvider>
      <ViewProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ViewProvider>
    </LaunchParamsProvider>
  </Router>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(); // runtime download
}
