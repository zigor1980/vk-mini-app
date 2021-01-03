import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import UserContext from 'context/userContext';
import CustomHeader from 'components/CustomHeader';
import CustomPanel from 'components/CustomPanel';
import Logo from 'components/Logo';

// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// import trailerImage from '../../img/trailer.png';
import './styles.scss';

const AnalyzeView = ({ id, goToView }) => {
  const { authData, user } = useContext(UserContext);

  useEffect(() => {
    bridge
      .send('VKWebAppCallAPIMethod', {
        method: 'groups.get',
        params: {
          extended: 1,
          fields: 'activity',
          user_id: user.id,
          access_token: authData && authData.access_token,
          v: '5.126',
        },
      })
      .then(() => {
        console.log('groups featched');

        return new Promise(resolve => setTimeout(resolve, 1000));
      })
      .then(() => goToView('result'))
      .catch(error => console.log(error));
  }, []);

  return (
    <CustomPanel
      className="analyze-screen"
      id={id}
      header={
        <CustomHeader>
          <Logo size={85} />
        </CustomHeader>
      }
    >
      <h1 className="general-header">Анализируем вашу страницу…</h1>
    </CustomPanel>
  );
};

AnalyzeView.propTypes = {
  id: PropTypes.string,
  goToView: PropTypes.func.isRequired,
};

export default AnalyzeView;
