import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import bridge from '@vkontakte/vk-bridge';
import { Div } from '@vkontakte/vkui';

import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import AudioPlayer from 'components/Player';
import Cover from 'components/Cover';

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
      <Cover
        className="result-screen__cover"
        src={user.photo_200}
        title={
          <>
            <span className="result-screen__user-name">{`${user.first_name} ${user.last_name}!`}</span>
            <br />
            Вот так звучит ваша душа!
          </>
        }
      />
      <Div style={{ padding: 0 }}>
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
