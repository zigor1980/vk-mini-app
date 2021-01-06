import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';

import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const Persik = props => {
  useEffect(() => {
    props.setPopout(
      <PopoutWrapper hasMask>
        <ScreenSpinner />
      </PopoutWrapper>,
    );
    setTimeout(() => props.setPopout(null), 2000);
  }, []);

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={props.go} data-to="home">
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Persik
      </PanelHeader>
      <img className="Persik" src={persik} alt="Persik The Cat" />
    </Panel>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  setPopout: PropTypes.func,
};

export default Persik;
