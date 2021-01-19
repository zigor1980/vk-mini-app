import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import { useLocation } from 'react-router';
import { Alert, Div, Button } from '@vkontakte/vkui';
import queryString from 'query-string';

import LaunchParamsContext from 'context/launchParamsContext';
import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';
import API from 'utils/api';
import { getSignedUrl } from 'utils/aws';
import './styles.scss';
import { getUserInfo } from 'utils/VKMethods';

const videoSourceDesktop =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_desktop.mp4';
const videoSourceMobile =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_mobile.mp4';

const StartScreen = ({ id, setPopout }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { hash = '' } = useLocation();
  const { setUser, saveUserToken, setShared } = useContext(UserContext);
  const { launchParams, isDesktop } = useContext(LaunchParamsContext);

  const loadUser = () => {
    const result = {};
    API.login(launchParams)
      .then(({ data }) => {
        const { accessToken } = data;

        return saveUserToken(accessToken);
      })
      .then(() => API.getUser())
      .then(({ data: userData }) => {
        result.userData = userData;
      })
      .then(() =>
        bridge.send('VKWebAppGetUserInfo').then(data => {
          result.user = data;
        }),
      )
      .then(() => getUserInfo(result.user.id))
      .then(data => {
        result.user = {
          ...result.user,
          ...data,
        };
      })
      .then(() => {
        const { userData, user } = result;
        const { songId } = userData;
        setUser({ ...user, ...userData });
        const hashString = hash && hash.replace(/^#/, '?');
        const { shareId: shareUserId } = queryString.parse(hashString);

        if (shareUserId && shareUserId !== `${user.id}`) {
          API.getUserById(shareUserId)
            .then(({ data }) => {
              setShared({
                ...data,
                songUrl: getSignedUrl(data.songUrl),
              });
            })
            .then(() => {
              setCurrentView(VIEWS.share);
            })
            .catch(() => {
              if (songId) {
                setCurrentView(VIEWS.result);
              } else {
                setCurrentView(VIEWS.home);
              }
            });
        } else if (songId) {
          setCurrentView(VIEWS.result);
        } else {
          setCurrentView(VIEWS.home);
        }
      })
      .catch(error => {
        const errorData = error.error_data;
        const { error_code: errorCode, error_reason: errorReason } =
          errorData || {};

        setPopout(
          <Alert>
            <Div>
              {errorCode === 4 && errorReason === 'User denied'
                ? 'Для продолжения работы необходимо разрешить доступ к общей информации'
                : 'Ошибка!'}{' '}
            </Div>
            <Div>
              <Button
                onClick={() => {
                  setPopout(null);
                  loadUser();
                }}
              >
                Попробовать снова
              </Button>
            </Div>
          </Alert>,
        );
      });
  };

  useEffect(() => {
    setTimeout(loadUser, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <CustomPanel
      id={id}
      className="start-screen"
      isLargeLogo
      withVideoBackground
      videoSrc={isDesktop ? videoSourceDesktop : videoSourceMobile}
    ></CustomPanel>
  );
};

StartScreen.propTypes = {
  id: PropTypes.string,
  setPopout: PropTypes.func.isRequired,
};

export default StartScreen;
