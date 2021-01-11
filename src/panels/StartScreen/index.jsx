import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import { useLocation } from 'react-router';

import LaunchParamsContext from 'context/launchParamsContext';
import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';
import API from 'utils/api';
import './styles.scss';

const StartScreen = ({ id }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { hash } = useLocation();
  const {
    setUser,
    setAuthData,
    saveUserToken,
    requestPermissions,
    setShared,
  } = useContext(UserContext);
  const { launchParams } = useContext(LaunchParamsContext);

  const loadUser = () => {
    const promise = Promise.all([
      API.login(launchParams)
        .then(({ data }) => {
          const { accessToken } = data;

          return saveUserToken(accessToken);
        })
        .then(() => API.getUser())
        .then(({ data: userData }) => userData),
      bridge.send('VKWebAppGetUserInfo').then(data => data),
      bridge
        .send('VKWebAppStorageGet', {
          keys: ['accessToken'],
        })
        .then(({ keys = [] }) => {
          const { accessToken } = keys.reduce((memo, { key, value }) => {
            const buf = memo;
            buf[key] = value && JSON.parse(value);

            return buf;
          }, {});

          return accessToken;
        }),
    ]);

    promise
      .then(([userData, user, authData]) => {
        // const { songId } = userData;
        setUser({ ...userData, ...user });
        setAuthData(authData);

        if (hash) {
          const userId = hash.replace(/^#/, '');
          Promise.all([
            requestPermissions(launchParams),
            API.getUserById(userId).then(({ data }) => setShared(data)),
          ]).then(() => {
            setCurrentView(VIEWS.share);
          });
          // }
          // else if (songId) {
          //   requestPermissions(launchParams).then(() => {
          //     setCurrentView(VIEWS.result);
          //   });
        } else {
          setCurrentView(VIEWS.home);
        }
      })
      .catch(error => {
        console.log(error);
        setCurrentView(VIEWS.accessError);
      });
  };

  useEffect(() => {
    bridge
      .send('VKWebAppStorageSet', {
        key: 'accessToken',
        value: JSON.stringify(null),
      })
      .then(() => loadUser());

    // eslint-disable-next-line
  }, []);

  return (
    <CustomPanel id={id} className="start-screen" isLargeLogo></CustomPanel>
  );
};

StartScreen.propTypes = {
  id: PropTypes.string,
};

export default StartScreen;
