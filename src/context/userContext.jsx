import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [shared, setShared] = useState(null);
  const [song, setSong] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const saveUserToken = tokenResponse =>
    bridge
      .send('VKWebAppStorageSet', {
        key: 'userToken',
        value: JSON.stringify(tokenResponse),
      })
      .then(() => {
        setUserToken(tokenResponse);
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

  return (
    <UserContext.Provider
      value={{
        user,
        userToken,
        song,
        shared,
        setShared,
        saveUserToken,
        setUser,
        token,
        setToken,
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
