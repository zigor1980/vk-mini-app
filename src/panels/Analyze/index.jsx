import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';

const promissedTimeout = callback =>
  new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, 1000);
  });

const Analyze = ({ id, goToView }) => {
  const [progress, setProgress] = useState(0);

  const increaseProgress = () => setProgress(prevProgress => prevProgress + 20);

  useEffect(() => {
    promissedTimeout(increaseProgress)
      .then(() => promissedTimeout(increaseProgress))
      .then(() => promissedTimeout(increaseProgress))
      .then(() => promissedTimeout(increaseProgress))
      .then(() => promissedTimeout(increaseProgress))
      .then(() => promissedTimeout(increaseProgress))
      .then(() => {
        goToView('result');
      });
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

Analyze.propTypes = {
  id: PropTypes.string,
  goToView: PropTypes.func,
};

export default Analyze;
