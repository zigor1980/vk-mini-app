import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import bridge from '@vkontakte/vk-bridge';
import { Div } from '@vkontakte/vkui';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';

import API from 'utils/api';
import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import AudioPlayer from 'components/Player';
import Cover from 'components/Cover';
import './styles.scss';

const Result = ({ id, go, setPopout }) => {
  const { user, song, authData, setSong } = useContext(UserContext);

  useEffect(() => {
    if (!song && user && user.songId) {
      setPopout(
        <PopoutWrapper hasMask>
          <ScreenSpinner />
        </PopoutWrapper>,
      );
      API.getSong().then(({ data }) => {
        setSong(data);
        setPopout(null);
      });
    }
  }, []);

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
        <AudioPlayer
          src={song && song.url}
          title={`Душа ${user.firstNameGen} ${user.lastNameGen}`}
        />
      </Div>
      <Div>
        <CustomButton
          className="result-screen__button result-screen__button_add"
          onClick={() => {
            API.loadSong(song && song.url)
              .then(({ data }) => {
                const file = new File([data], 'name');
                console.log(file);

                return bridge.send('VKWebAppCallAPIMethod', {
                  method: 'audio.getUploadServer',
                  params: {
                    v: '5.126',
                    access_token: authData.access_token,
                  },
                });
              })
              .then(data => {
                console.log('srver', data);
              });
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
  setPopout: PropTypes.func.isRequired,
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
