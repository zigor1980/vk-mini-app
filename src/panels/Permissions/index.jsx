import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import LaunchParamsContext from 'context/launchParamsContext';

import catSrc from '../../img/cat.png';
import './styles.scss';

const Permissions = ({ id, goToView }) => {
  const { setAuthData } = useContext(UserContext);
  const { launchParams = {} } = useContext(LaunchParamsContext);
  const requestPermissions = () => {
    bridge
      .send('VKWebAppGetAuthToken', {
        app_id: launchParams && +launchParams.vk_app_id,
        scope: 'friends,stories,wall,groups',
      })
      .then(result => setAuthData(result))
      .then(() => {
        goToView('analyze');
      })
      .catch(error => error);
  };

  return (
    <CustomPanel
      id={id}
      header={
        <PanelHeader separator={false}>
          <Logo size={85} />
        </PanelHeader>
      }
      className="permissions-screen"
    >
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
        <CustomButton onClick={requestPermissions} data-to="permissions">
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
