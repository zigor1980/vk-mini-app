/* eslint-disable */

import React, { useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';

// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';
import UserContext from './context/userContext';
import Home from './panels/Home';
import AccessError from './panels/AccessError';
import StartScreen from './panels/StartScreen';
import TrailerView from './panels/Trailer';
import Permissions from './panels/Permissions';
import Analyze from './panels/Analyze';
import Result from './panels/Result';

import './styles.scss';

const App = () => {
  const { view, setCurrentView } = useContext(ViewContext);
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await bridge.send('VKWebAppGetUserInfo');
        setUser(data);
      } catch (error) {
        setCurrentView(VIEWS.accessError);
      }
    }
    fetchData();
  }, [setUser]);

  const go = e => {
    setCurrentView(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={view}>
      <StartScreen id={VIEWS.start} />
      <Home id={VIEWS.home} goToView={setCurrentView} go={go} />
      <TrailerView id="trailer" go={go} />
      <AccessError id="access_error" />
      <Permissions id="permissions" goToView={setCurrentView} />
      <Analyze id="analyze" goToView={setCurrentView} />
      <Result id="result" goToView={setCurrentView} go={go} />
    </View>
  );
};

export default App;
