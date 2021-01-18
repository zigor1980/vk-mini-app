import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import './styles.scss';
import UserContext from 'context/userContext';
import ViewContext from 'context/viewContext';

const TrailerView = ({ id }) => {
  const { user } = useContext(UserContext);
  const { setCurrentView } = useContext(ViewContext);
  const goBack = () => {
    if (user && user.songId) {
      setCurrentView('result');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <CustomPanel className="trailer-screen" id={id} withBack onBack={goBack}>
      <Div style={{ paddingBottom: 0 }}>
        <p className="common-description trailer__description">
          Школьный учитель музыки Джо Гарднер случайно попадает в мир, где
          зарождаются человеческие увлечения, мечты и интересы, и там он
          знакомится с молодой душой по имени 22.
          <br />
          <b>
            Смотрите анимационное приключение Disney и Pixar &laquo;Душа&raquo;
            в кино с 21 января!
          </b>
        </p>
      </Div>
      <Div className="trailer-screen__video-container">
        <iframe
          className="trailer-screen__video"
          height="315"
          title="Душа трейлер"
          src="https://www.youtube.com/embed/R33DQ7GyuSk"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Div>
      <Div className="trailer-screen__button" style={{ textAlign: 'center' }}>
        <CustomButton
          onClick={() => {
            const link = document.createElement('a');
            link.setAttribute('href', 'https://go.music-of-soul.ru/kncmoo');
            link.setAttribute('target', '_blank');
            link.click();
          }}
        >
          Купить билет
        </CustomButton>
      </Div>
    </CustomPanel>
  );
};

TrailerView.propTypes = {
  id: PropTypes.string,
};

export default TrailerView;
