import React from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ReactGA from 'react-ga';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';

import catSrc from '../../img/cat.png';
import './styles.scss';

const Permissions = ({ id, goToView }) => {
  const getPermissions = () => {
    ReactGA.event({
      category: 'general',
      action: 'agree',
    });
    goToView('analyze');
  };

  return (
    <CustomPanel id={id} centered className="permissions-screen">
      <Div style={{ paddingBottom: 0 }}>
        <h1 className="general-header">
          Чтобы услышать душу, нужен доступ к информации с вашей страницы!
        </h1>
        <p className="permissions-screen__description common-description">
          Не переживайте, для создания мелодии достаточно только общедоступной
          информации!
        </p>
        <img src={catSrc} alt="main" className="permissions-screen__image" />
      </Div>
      <Group title="Navigation Example" style={{ textAlign: 'center' }}>
        <CustomButton onClick={getPermissions} data-to="permissions">
          Дать доступ
        </CustomButton>
      </Group>
    </CustomPanel>
  );
};

Permissions.propTypes = {
  id: PropTypes.string,
  goToView: PropTypes.func.isRequired,
};

export default Permissions;
