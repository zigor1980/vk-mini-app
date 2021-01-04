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
import './styles.scss';

const STEPS = [
  'Анализируем вашу страницу...',
  'Изучаем список сообществ...',
  'Смотрим на ваши интересы...',
  'Знакомимся в вашими друзьями...',
  'Рассматриваем ваши фотографии...',
  'Осталась пара нот. Момент...',
];

const AnalyzeView = ({ id, goToView }) => {
  const { authData, user } = useContext(UserContext);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step < STEPS.length) {
      setTimeout(() => setStep(current => current + 1), 2000);
    } else {
      goToView('result');
    }
  }, [step]);

  return (
    <CustomPanel className="analyze-screen" id={id}>
      <h1 className="general-header" style={{ width: '100%' }}>
        <div className="step-container" style={{ width: '100%' }}>
          {STEPS.map((currentStep, index) => (
            <span
              className={classnames('step', {
                'current-step': index === step,
              })}
            >
              {currentStep}
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
