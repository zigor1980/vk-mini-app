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

const videoSourceDesktop =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_desktop.mp4';
const videoSourceMobile =
  'https://disney-soul.s3.eu-west-2.amazonaws.com/videos/Loader_mobile.mp4';

const StartScreen = ({ id, setPopout }) => {
  const { setCurrentView } = useContext(ViewContext);
  const { hash = '' } = useLocation();
  const {
    setUser,
    setAuthData,
    saveUserToken,
    requestPermissions,
    setShared,
  } = useContext(UserContext);
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
      .then(() =>
        bridge
          .send('VKWebAppStorageGet', {
            keys: ['accessToken'],
          })
          .then(({ keys = [] }) => {
            const { accessToken } = keys.reduce((memo, { key, value }) => {
              const buf = memo;
              buf[key] = value && JSON.parse(value);

              return buf;
            }, {});

            result.authData = accessToken;
          }),
      )
      .then(() => {
        const { userData, user, authData } = result;
        const { songId } = userData;
        setUser({ ...user, ...userData });
        setAuthData(authData);
        const shareUserId = hash && hash.replace(/^#/, '');

        if (shareUserId && shareUserId !== `${user.id}`) {
          const userId = hash.replace(/^#/, '');
          requestPermissions(launchParams)
            .then(() =>
              API.getUserById(userId).then(({ data }) => {
                setShared({
                  ...data,
                  songUrl: getSignedUrl(data.songUrl),
                });
              }),
            )
            .then(() => {
              setCurrentView(VIEWS.share);
            })
            .catch(() => {
              if (songId) {
                requestPermissions(launchParams).then(() => {
                  setCurrentView(VIEWS.result);
                });
              } else {
                setCurrentView(VIEWS.home);
              }
            });
        } else if (songId) {
          requestPermissions(launchParams).then(() => {
            setCurrentView(VIEWS.result);
          });
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
    bridge
      .send('VKWebAppStorageSet', {
        key: 'accessToken',
        value: JSON.stringify(null),
      })
      .then(() => {
        setTimeout(loadUser, 1000);
      });

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
