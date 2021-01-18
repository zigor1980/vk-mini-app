/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import classnames from 'classnames';
import UserContext from 'context/userContext';
import CustomHeader from 'components/CustomHeader';
import CustomPanel from 'components/CustomPanel';
import Logo from 'components/Logo';
import API from 'utils/api';

// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// import trailerImage from '../../img/trailer.png';
// import videoSource from '../../video/analyze-video-bg.mp4';
import './styles.scss';
import LaunchParamsContext from 'context/launchParamsContext';

const STEPS = [
  { key: 'page', delay: 3000, text: 'Анализируем вашу страницу...' },
  { key: 'grouos', delay: 2500, text: 'Смотрим на ваши интересы...' },
  { key: 'interests', delay: 2000, text: 'Определяем мелодию...' },
  { key: 'friends', delay: 3000, text: 'Настраиваем инструменты...' },
  { key: 'photos', delay: 2500, text: 'Подбираем ритм...' },
  { key: 'last', delay: 1500, text: 'Осталась пара нот. Момент...' },
];

const videoSourceDesctop =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Analyse_desktop.mp4';
const videoSourceMobile =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Analyse_mobile.mp4';
const AnalyzeView = ({ id, goToView }) => {
  const { user, setSong, setUser } = useContext(UserContext);
  const { isDesktop } = useContext(LaunchParamsContext);

  const [step, setStep] = useState(0);
  useEffect(() => {
    Promise.all([
      STEPS.reduce((memo, element, index) => {
        return memo.then(
          () =>
            new Promise(resolve => {
              setTimeout(() => {
                setStep(current => current + 1);
                resolve();
              }, STEPS[step].delay);
            }),
        );
      }, Promise.resolve()),
      API.getSong(),
    ]).then(([_, song]) => {
      setSong(song);
      setUser(prev => ({
        ...prev,
        songId: song && song.id,
      }));
      goToView('result');
    });
  }, []);

  return (
    <CustomPanel
      className="analyze-screen"
      id={id}
      withVideoBackground
      videoSrc={isDesktop ? videoSourceDesctop : videoSourceMobile}
    >
      <h1 className="general-header" style={{ width: '100%' }}>
        <div className="step-container" style={{ width: '100%' }}>
          {STEPS.map(({ text, key }, index) => (
            <span
              key={key}
              className={classnames('step', {
                'current-step': index === step,
              })}
            >
              {text}
            </span>
          ))}
        </div>
      </h1>
    </CustomPanel>
  );
};

AnalyzeView.propTypes = {
  id: PropTypes.string,
  goToView: PropTypes.func.isRequired,
};

export default AnalyzeView;
