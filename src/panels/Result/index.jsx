import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
// import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import { platform, IOS } from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import UserContext from '../../context/userContext';
const osName = platform();

const ResultView = ({ go, id }) => {
  const { user } = useContext(UserContext);

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={go} data-to="home">
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Result view
      </PanelHeader>
      <Div>
        {user && (
          <Group title="User Data Fetched with VK Bridge">
            {user.photo_200 ? (
              <Avatar mode="image" src={user.photo_200} size="100" />
            ) : null}
            <Div> {`${user.first_name} ${user.last_name}`}</Div>
          </Group>
        )}
      </Div>
      <Div style={{ textAlign: 'center' }}>
        <Button size="m" level="2" onClick={go} data-to="trailer">
          Смотреть трейлер
        </Button>
      </Div>
    </Panel>
  );
};

ResultView.propTypes = {
  id: PropTypes.string,
  go: PropTypes.func.isRequired,
};

export default ResultView;
