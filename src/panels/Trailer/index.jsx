import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
// import Group from '@vkontakte/vkui/dist/components/Group/Group';
// import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { platform, IOS } from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
const osName = platform();

const TrailerView = ({ go }) => (
  <Panel id="trailer">
    <PanelHeader
      left={
        <PanelHeaderButton onClick={go} data-to="home">
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </PanelHeaderButton>
      }
    >
      Trailer view
    </PanelHeader>
    <Div>
      <Button mode="commerce" size="m" level="2">
        Купить билет
      </Button>
    </Div>
  </Panel>
);

TrailerView.propTypes = {
  go: PropTypes.func.isRequired,
};

export default TrailerView;
