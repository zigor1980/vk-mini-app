/* eslint-disable */

import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import ViewContext from 'context/viewContext';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';

import './styles.scss';

const StartScreen = ({ id }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { setUser } = useContext(UserContext);
  const loadUser = async () => {
    try {
      const data = await bridge.send('VKWebAppGetUserInfo');
      setUser(data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentView('home');
    } catch (error) {
      setCurrentView('access_error');
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <CustomPanel id={id} className="start-screen" isLargeLogo></CustomPanel>
  );
};

StartScreen.propTypes = {
  id: PropTypes.string,
};

export default StartScreen;
