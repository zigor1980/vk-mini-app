import React, { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';

// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import UserContext from './context/userContext';
import Home from './panels/Home';
import Persik from './panels/Persik';
import AccessError from './panels/AccessError';
import StartScreen from './panels/StartScreen';
import TrailerView from './panels/Trailer';
import Permissions from './panels/Permissions';
import Analyze from './panels/Analyze';
import Result from './panels/Result';

const App = () => {
  const [activePanel, setActivePanel] = useState('start');

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      try {
        const data = await bridge.send('VKWebAppGetUserInfo');
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setActivePanel('access_error');
      }
    }
    fetchData();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={activePanel}>
      <StartScreen id="start" goToView={setActivePanel} />
      <Home id="home" fetchedUser={user} go={go} />
      <TrailerView id="trailer" go={go} />
      <Persik id="persik" go={go} />
      <AccessError id="access_error" />
      <Permissions id="permissions" go={go} />
      <Analyze id="analyze" goToView={setActivePanel} />
      <Result id="result" go={go} />
    </View>
  );
};

export default App;
