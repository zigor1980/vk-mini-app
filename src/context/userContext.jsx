import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [songId, setSongId] = useState(null);
  const saveSongId = id => {
    bridge
      .send('VKWebAppStorageSet', {
        key: 'songId',
        value: JSON.stringify(id),
      })
      .then(() => {
        setSongId(id);
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
        songId,
        setUser,
        authData,
        saveAuthData,
        setAuthData,
        setSongId,
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
