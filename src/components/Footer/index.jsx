import React from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import ageMark from '../../img/6.svg';
import './styles.scss';

export default function () {
  return (
    <Div className="footer">
      <p className="footer__copyright">&copy; 2020 Disney/Pixar</p>
      <img src={ageMark} alt="6+" className="footer__age-mark" />
    </Div>
  );
}
