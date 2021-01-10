import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import Button from '@vkontakte/vkui/dist/components/Button/Button';
// import Group from '@vkontakte/vkui/dist/components/Group/Group';
// import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
// import Div from '@vkontakte/vkui/dist/components/Div/Div';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const AccessError = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Access Error</PanelHeader>
  </Panel>
);

AccessError.propTypes = {
  id: PropTypes.string.isRequired,
  // go: PropTypes.func.isRequired,
};

export default AccessError;
