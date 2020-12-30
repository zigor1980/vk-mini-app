import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';

// import bridge from '@vkontakte/vk-bridge';
import { UserProvider } from './context/userContext';
import App from './App';

// // Init VK  Mini App
// bridge.send('VKWebAppInit').then(result => console.log(result));

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); // runtime download
}
