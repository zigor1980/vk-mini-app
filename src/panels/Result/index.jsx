import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { Div } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import Avatar from 'components/Avatar';
import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import AudioPlayer from 'components/Player';

// import audioSrc from '../../audio/sound.mp3';
import './styles.scss';

const Result = ({ id, go }) => {
  const { user } = useContext(UserContext);

  return (
    <CustomPanel
      id={id}
      header={
        <PanelHeader separator={false}>
          <Logo size={85} />
        </PanelHeader>
      }
      className="result-screen"
    >
      <Div
        className={classnames('result-screen__cover', {
          'result-screen__cover_mobile': true,
          'result-screen__cover_desktop': false,
        })}
      >
        <Avatar className="result-screen__avatar" src={user.photo_200} />
        <p className="result-screen__user">
          <span className="result-screen__user-name">{`${user.first_name} ${user.last_name}!`}</span>
          <br />
          Вот так звучит ваша душа!
        </p>
      </Div>
      <Div style={{ padding: 0 }}>
        {/* eslint-disable-next-line */}
        <AudioPlayer />
      </Div>
      <Div>
        <CustomButton
          className="result-screen__button result-screen__button_add"
          onClick={() => {
            console.log('wall');
          }}
        >
          Добавить в мою музыку
        </CustomButton>
      </Div>
      <h1 className="general-header">
        Поделитесь с друзьями мелодией вашей души
      </h1>
      <Div className="result-screen__share">
        <CustomButton
          className="result-screen__button result-screen__button_share"
          onClick={() => {
            bridge.send('VKWebAppShowWallPostBox', {
              message: 'Hello!',
              owner_id: user && user.id,
            });
          }}
        >
          На стену
        </CustomButton>
        <CustomButton
          className="result-screen__button result-screen__button_share"
          onClick={() => {
            bridge.send('VKWebAppShowStoryBox', {
              background_type: 'image',
              url:
                'https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg',
            });
          }}
        >
          В историю
        </CustomButton>
      </Div>
      <CustomButton type="link" onClick={go} data-to="trailer">
        Смотреть трейлер
      </CustomButton>
    </CustomPanel>
  );
};

Result.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  // goToView: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Result;
