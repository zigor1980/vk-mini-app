import React from 'react';
import PropTypes from 'prop-types';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';

// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import trailerImage from '../../img/trailer.png';
import './styles.scss';

const TrailerView = ({ id, go }) => (
  <CustomPanel className="trailer-screen" id={id} withBack onBack={go}>
    <Div style={{ paddingBottom: 0 }}>
      <p className="common-description trailer__description">
        Школьный учитель музыки Джо Гарднер случайно попадает в мир, где
        зарождаются человеческие увлечения, мечты и интересы, и там он
        знакомится с молодой душой по имени 22.
        <br />
        <b>
          Смотрите анимационное приключение Disney и Pixar “Душа” в кино с 21
          января!
        </b>
      </p>
    </Div>
    <Div style={{ paddingBottom: 0 }}>
      <img
        src={trailerImage}
        alt="Trailer"
        style={{ maxWidth: '100%', margin: 'auto', display: 'block' }}
      />
    </Div>
    <Div style={{ textAlign: 'center' }}>
      <CustomButton>Купить билет</CustomButton>
    </Div>
  </CustomPanel>
);

TrailerView.propTypes = {
  id: PropTypes.string,
  go: PropTypes.func.isRequired,
};

export default TrailerView;
