/* eslint-disable */

import React, { useEffect, useContext, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import { Alert } from '@vkontakte/vkui';
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
import Share from './panels/Share';
import LaunchParamsContext from 'context/launchParamsContext';

import './styles.scss';

const App = () => {
  const context = useContext(LaunchParamsContext);
  console.log(context);
  const { view, setCurrentView } = useContext(ViewContext);
  const { setUser } = useContext(UserContext);
  const [popout, setPopout] = useState(null);
  console.log('app view', view);

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
    <View activePanel={view} popout={popout}>
      <StartScreen id={VIEWS.start} />
      <Home id={VIEWS.home} goToView={setCurrentView} go={go} />
      <TrailerView id="trailer" go={go} />
      <AccessError id="access_error" />
      <Permissions id="permissions" goToView={setCurrentView} />
      <Analyze id="analyze" goToView={setCurrentView} />
      <Result
        id="result"
        goToView={setCurrentView}
        go={go}
        setPopout={setPopout}
      />
      <Share id={VIEWS.share} go={go} setPopout={setPopout} />
    </View>
  );
};

export default App;
