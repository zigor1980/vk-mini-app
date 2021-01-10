/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import classnames from 'classnames';
import UserContext from 'context/userContext';
import CustomHeader from 'components/CustomHeader';
import CustomPanel from 'components/CustomPanel';
import Logo from 'components/Logo';

// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// import trailerImage from '../../img/trailer.png';
// import videoSource from '../../video/analyze-video-bg.mp4';
import './styles.scss';
import LaunchParamsContext from 'context/launchParamsContext';

const STEPS = [
  { key: 'page', delay: 3000, text: 'Анализируем вашу страницу...' },
  { key: 'grouos', delay: 2500, text: 'Изучаем список сообществ...' },
  { key: 'interests', delay: 2000, text: 'Смотрим на ваши интересы...' },
  { key: 'friends', delay: 3000, text: 'Знакомимся с вашими друзьями...' },
  { key: 'photos', delay: 2500, text: 'Рассматриваем ваши фотографии...' },
  { key: 'last', delay: 1500, text: 'Осталась пара нот. Момент...' },
];

const videoSourceDesctop =
  'https://storage.googleapis.com/soul_mpv/videos/Analyse_desktop.mp4';
const videoSourceMobile =
  'https://storage.googleapis.com/soul_mpv/videos/Analyse_mobile.mp4';
const AnalyzeView = ({ id, goToView }) => {
  const { authData, user, saveSongId, setSongId } = useContext(UserContext);
  const { isDesktop } = useContext(LaunchParamsContext);

  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step < STEPS.length) {
      setTimeout(() => setStep(current => current + 1), STEPS[step].delay);
    } else {
      saveSongId('1123');
      goToView('result');
    }
  }, [step]);

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
