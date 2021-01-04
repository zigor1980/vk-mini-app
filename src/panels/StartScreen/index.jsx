import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import ViewContext from 'context/viewContext';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';

import './styles.scss';

const StartScreen = ({ id }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { setUser } = useContext(UserContext);

  const loadUser = () => {
    bridge
      .send('VKWebAppGetUserInfo')
      .then(data => {
        setUser(data);
        setCurrentView('home');
      })
      .catch(() => {
        setCurrentView('access_error');
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
