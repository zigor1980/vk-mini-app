import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ReactGA from 'react-ga';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import LaunchParamsContext from 'context/launchParamsContext';

import mainSrc from '../../img/main.png';
import './styles.scss';

const Home = ({ id, goToView, go }) => {
  const { isDesktop } = useContext(LaunchParamsContext);
  const goToAnalyze = useCallback(() => {
    ReactGA.event({
      category: 'general',
      action: 'go',
    });
    goToView('permissions');
  }, [goToView]);

  const viewTrailer = useCallback(
    e => {
      ReactGA.event({
        category: 'general',
        action: 'watchtrailer',
      });
      go(e);
    },
    [go],
  );

  return (
    <CustomPanel
      centered
      id={id}
      header={
        <PanelHeader separator={false}>
          <Logo size={85} />
        </PanelHeader>
      }
      className="home-screen"
    >
      <Div style={{ paddingBottom: 0 }}>
        <h1 className="general-header">Узнайте, как звучит ваша душа!</h1>
        <p className="home-screen__description common-description">
          Получите уникальную джазовую композицию, основанную на ваших
          увлечениях, интересах и характере!
        </p>
        <img src={mainSrc} alt="main" className="home-screen__image" />
      </Div>
      <Group
        title="Navigation Example"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
        }}
      >
        <CustomButton
          className="home-screen__button home-screen__button_main"
          onClick={goToAnalyze}
        >
          {isDesktop ? 'Начать' : 'Послушать'}
        </CustomButton>
        <CustomButton
          className="home-screen__button home-screen__button_link"
          type="link"
          onClick={viewTrailer}
          data-to="trailer"
        >
          Смотреть трейлер
        </CustomButton>
      </Group>
    </CustomPanel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  goToView: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
