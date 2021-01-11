import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import { Div } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import AudioPlayer from 'components/Player';
import CustomPanel from 'components/CustomPanel';
import Cover from 'components/Cover';
import CustomButton from 'components/CustomButton';
import './styles.scss';
import UserContext from 'context/userContext';
import ViewContext from 'context/viewContext';

const Share = ({ id, setPopout }) => {
  const { shared, setShared, authData, user } = useContext(UserContext);
  const { setCurrentView } = useContext(ViewContext);
  useEffect(() => {
    setPopout(
      <PopoutWrapper hasMask>
        <ScreenSpinner />
      </PopoutWrapper>,
    );

    bridge
      .send('VKWebAppCallAPIMethod', {
        method: 'users.get',
        params: {
          v: '5.126',
          access_token: authData.access_token,
          user_ids: shared.id,
          name_case: 'gen',
        },
      })
      .then(({ response }) => {
        const [userResponse] = response;
        setShared(prev => ({ ...prev, ...userResponse }));
        setPopout(null);
      });
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    setCurrentView(user && user.songId ? 'result' : 'home');
  };

  return (
    <CustomPanel id={id} className="share-screen">
      <div style={{ padding: '0 15px' }}>
        <Cover
          src={shared.avatar}
          title={
            <>
              Вот так звучит душа
              <br />
              <span className="share-screen__user-name">{`${shared.first_name} ${shared.last_name}!`}</span>
            </>
          }
        />
        <Div style={{ padding: 0 }}>
          <AudioPlayer
            src={shared.songUrl}
            title={`Душа ${shared.first_name} ${shared.last_name}`}
          />
        </Div>
      </div>
      <div className="share-screen__footer">
        <span className="general-header ">
          Хотите услышать, как звучит ваша душа?
        </span>
        <CustomButton
          className="share-screen__button share-screen__button_agree"
          onClick={goBack}
        >
          Да
        </CustomButton>
      </div>
    </CustomPanel>
  );
};

Share.propTypes = {
  id: PropTypes.string.isRequired,
  //   go: PropTypes.func.isRequired,
  setPopout: PropTypes.func,
};

export default Share;
