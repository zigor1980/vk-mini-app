import React from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

const Permissions = ({ id, go }) => (
  <Panel id={id}>
    <Group>
      <Div>
        <Button size="m" onClick={go} data-to="analyze">
          К анализу
        </Button>
      </Div>
    </Group>
  </Panel>
);

Permissions.propTypes = {
  id: PropTypes.string,
  go: PropTypes.func.isRequired,
};

export default Permissions;
