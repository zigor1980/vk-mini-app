import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import bridge from '@vkontakte/vk-bridge';
import { Div } from '@vkontakte/vkui';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';

import API from 'utils/api';
import { getToken } from 'utils/VKMethods';
import CustomPanel from 'components/CustomPanel';
import CustomButton from 'components/CustomButton';
import Logo from 'components/Logo';
import UserContext from 'context/userContext';
import AudioPlayer from 'components/Player';
import Cover from 'components/Cover';
import './styles.scss';
import LaunchParamsContext from 'context/launchParamsContext';

const getImageDataUrl = blob =>
  new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        resolve(fileReader.result);
      },
      false,
    );
    fileReader.readAsDataURL(blob);
  });

const Result = ({ id, go, setPopout }) => {
  const { user, song, setSong } = useContext(UserContext);
  const { launchParams } = useContext(LaunchParamsContext);

  useEffect(() => {
    if (!song && user && user.songId) {
      const result = {};
      setPopout(
        <PopoutWrapper hasMask>
          <ScreenSpinner />
        </PopoutWrapper>,
      );
      API.getSong()
        .then(songResponse => {
          result.song = songResponse;
        })
        .then(() => {
          const { song: songData } = result;
          setSong(songData);
          setPopout(null);
        })
        .catch(() => {
          setPopout(null);
        });
    }
    // eslint-disable-next-line
  }, []);

  const doWallPost = () => {
    setPopout(
      <PopoutWrapper hasMask>
        <ScreenSpinner />
      </PopoutWrapper>,
    );

    getToken(launchParams && +launchParams.vk_app_id, ['photos'])
      .then(token =>
        bridge
          .send('VKWebAppCallAPIMethod', {
            method: 'photos.getWallUploadServer',
            params: {
              v: '5.126',
              access_token: token,
            },
          })
          .then(({ response }) => {
            const { upload_url: uploadUrl } = response;

            return uploadUrl;
          })
          .then(uploadUrl => API.getImageWall(uploadUrl))
          .then(({ data }) =>
            bridge.send('VKWebAppCallAPIMethod', {
              method: 'photos.saveWallPhoto',
              params: {
                v: '5.126',
                access_token: token,
                ...data,
              },
            }),
          )
          .then(({ response: [data] }) => {
            setPopout(null);
            bridge.send('VKWebAppShowWallPostBox', {
              message: '',
              owner_id: user && user.id,
              // attachments: `photo${data.owner_id}_${data.id}, https://vk.com/app${launchParams.vk_app_id}#${user.id}`,
              attachments: `photo${data.owner_id}_${data.id}, https://go.music-of-soul.ru/sjhnst`,
            });
          }),
      )
      .catch(error => {
        setPopout(
          <Alert onClose={() => setPopout(null)}>
            {JSON.stringify(error)}
          </Alert>,
        );
      });
  };

  const shareStory = () => {
    setPopout(
      <PopoutWrapper hasMask>
        <ScreenSpinner />
      </PopoutWrapper>,
    );

    API.getImageStory()
      .then(({ data }) => getImageDataUrl(data))
      .then(imageUrl => {
        setPopout(null);
        bridge.send('VKWebAppShowStoryBox', {
          background_type: 'image',
          blob: imageUrl,
          attachment: {
            type: 'url',
            url: `https://vk.com/app${launchParams.vk_app_id}#${user.id}?utm_source=vk&utm_medium=share&utm_campaign=wsoulmusicofyoursoul&utm_content=stories`,
            text: 'more',
          },
        });
      })
      .catch(error => {
        setPopout(
          <Alert
            header="Ошибка!"
            text={JSON.stringify(error)}
            onClose={() => setPopout(null)}
          />,
        );
      });
  };

  const {
    first_name: firstName,
    last_name: lastName,
    firstNameGen,
    lastNameGen,
  } = user;

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
            <span className="result-screen__user-name">{`${firstName} ${lastName}!`}</span>
            <br />
            Вот так звучит ваша душа!
          </>
        }
      />
      <Div style={{ padding: '0 10px' }}>
        <AudioPlayer
          src={song && song.url}
          title={
            firstNameGen && lastNameGen
              ? `Душа ${firstNameGen} ${lastNameGen}`
              : null
          }
        />
      </Div>
      {/* <Div>
        <CustomButton
          className="result-screen__button result-screen__button_add"
          onClick={() => {
            // API.loadSong(song && song.url)
            //   .then(({ data }) => {
            //     const file = new File([data], 'name');
            //     console.log(file);
            //     return bridge.send('VKWebAppCallAPIMethod', {
            //       method: 'audio.getUploadServer',
            //       params: {
            //         v: '5.126',
            //         access_token: authData.access_token,
            //       },
            //     });
            //   })
            //   .then(data => {
            //     console.log('srver', data);
            //   });
          }}
        >
          Добавить в мою музыку
        </CustomButton>
      </Div> */}
      <h1 className="general-header">
        Поделитесь с друзьями мелодией вашей души
      </h1>
      <Div className="result-screen__share">
        <CustomButton
          className="result-screen__button result-screen__button_share"
          onClick={doWallPost}
        >
          На стену
        </CustomButton>
        <CustomButton
          className="result-screen__button result-screen__button_share"
          onClick={shareStory}
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
