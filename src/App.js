import React, { useContext, useState } from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';

import Home from './panels/Home';
import AccessError from './panels/AccessError';
import StartScreen from './panels/StartScreen';
import TrailerView from './panels/Trailer';
import Permissions from './panels/Permissions';
import Analyze from './panels/Analyze';
import Result from './panels/Result';
import Share from './panels/Share';

import './styles.scss';

const App = () => {
  const { view, setCurrentView } = useContext(ViewContext);
  const [popout, setPopout] = useState(null);

  const go = e => {
    setCurrentView(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={view} popout={popout}>
      <StartScreen id={VIEWS.start} setPopout={setPopout} />
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
