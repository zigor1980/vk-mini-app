import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

const StartScreen = ({ id, goToView }) => {
  const [progress, setProgress] = useState(0);
  const load = () =>
    Promise.all([
      new Promise(resolve => setTimeout(resolve), 5000).then(() => {
        setProgress(prevValue => prevValue + 50);
      }),
      bridge.send('VKWebAppInit').then(() => {
        setProgress(prevValue => prevValue + 50);
      }),
    ]).then(() => goToView('home'));

  useEffect(() => {
    load();
  }, []);

  return (
    <Panel id={id}>
      <Group>
        <Div>
          <Progress value={progress} />
        </Div>
      </Group>
    </Panel>
  );
};

StartScreen.propTypes = {
  id: PropTypes.string,
  goToView: PropTypes.func.isRequired,
};

export default StartScreen;
