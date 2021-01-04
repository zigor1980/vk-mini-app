import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);

  const saveAuthData = data =>
    bridge
      .send('VKWebAppStorageSet', {
        key: 'accessToken',
        value: JSON.stringify(data),
      })
      .then(({ result }) => {
        if (result) setAuthData(data);
      });

  useEffect(() => {
    bridge
      .send('VKWebAppStorageGet', {
        keys: ['accessToken'],
      })
      .then(({ keys = [] }) => {
        const data = keys.find(({ key }) => key === 'accessToken');

        if (data) {
          const { value } = data;
          setAuthData(JSON.parse(value));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, authData, setAuthData: saveAuthData }}
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
