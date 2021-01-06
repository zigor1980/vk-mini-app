import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import { useLocation } from 'react-router';

import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';

import './styles.scss';

const StartScreen = ({ id }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { hash } = useLocation();
  const { setUser, setSongId, setAuthData } = useContext(UserContext);

  const loadUser = () => {
    bridge
      .send('VKWebAppGetUserInfo')
      .then(data => {
        setUser(data);
      })
      .then(() =>
        bridge
          .send('VKWebAppStorageGet', {
            keys: ['accessToken', 'songId'],
          })
          .then(({ keys = [] }) => {
            const { accessToken, songId } = keys.reduce(
              (memo, { key, value }) => {
                const buf = memo;
                buf[key] = value && JSON.parse(value);

                return buf;
              },
              {},
            );

            setSongId(songId);
            setAuthData(accessToken);

            return songId;
          }),
      )
      .then(songId => {
        if (hash) {
          setCurrentView(VIEWS.share);
        } else if (songId) {
          setCurrentView(VIEWS.result);
        } else {
          setCurrentView(VIEWS.home);
        }
      })
      .catch(() => {
        setCurrentView(VIEWS.accessError);
      });
  };

  useEffect(() => {
    setTimeout(loadUser, 1000);
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
