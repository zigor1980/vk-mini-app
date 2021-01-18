import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import { useLocation } from 'react-router';
import { Alert } from '@vkontakte/vkui';

import LaunchParamsContext from 'context/launchParamsContext';
import { VIEWS } from 'constants/views';
import ViewContext from 'context/viewContext';
import UserContext from 'context/userContext';
import CustomPanel from 'components/CustomPanel';
import API from 'utils/api';
import { getSignedUrl } from 'utils/aws';
import './styles.scss';
import { getToken, getUserInfo } from 'utils/VKMethods';

const videoSourceDesktop =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_desktop.mp4';
const videoSourceMobile =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_mobile.mp4';

const StartScreen = ({ id, setPopout }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { hash = '' } = useLocation();
  const { setUser, saveUserToken, setShared, setToken } = useContext(
    UserContext,
  );
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
      .then(() => getToken(launchParams && +launchParams.vk_app_id))
      .then(token => {
        setToken(token);

        return getUserInfo(result.user.id, token);
      })
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
        const shareUserId = hash && hash.replace(/^#/, '');

        if (shareUserId && shareUserId !== `${user.id}`) {
          const userId = hash.replace(/^#/, '');
          API.getUserById(userId)
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
        setPopout(
          <Alert onClose={() => setPopout(null)}>
            {JSON.stringify(error)}
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
