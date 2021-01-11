import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [shared, setShared] = useState(null);
  const [song, setSong] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const requestPermissions = launchParams =>
    bridge
      .send('VKWebAppGetAuthToken', {
        app_id: launchParams && +launchParams.vk_app_id,
        request_id: 'https://sheltered-earth-69434.herokuapp.com/',
        scope: 'stories,wall,photos',
      })
      .then(result => {
        setAuthData(result);

        return result;
      });
  const saveUserToken = token =>
    bridge
      .send('VKWebAppStorageSet', {
        key: 'userToken',
        value: JSON.stringify(token),
      })
      .then(() => {
        setUserToken(token);
      });
  const saveSongId = id => {
    bridge
      .send('VKWebAppStorageSet', {
        key: 'songId',
        value: JSON.stringify(id),
      })
      .then(() => {
        setSong(id);
      });
  };

  const saveAuthData = data =>
    bridge
      .send('VKWebAppStorageSet', {
        key: 'accessToken',
        value: JSON.stringify(data),
      })
      .then(({ result }) => {
        if (result) setAuthData(data);
      });

  return (
    <UserContext.Provider
      value={{
        user,
        userToken,
        song,
        shared,
        setShared,
        saveUserToken,
        requestPermissions,
        setUser,
        authData,
        saveAuthData,
        setAuthData,
        setSong,
        saveSongId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default UserContext;
