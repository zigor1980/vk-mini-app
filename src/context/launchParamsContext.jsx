import React from 'react';
import PropTypes from 'prop-types';
import { platform } from '@vkontakte/vkui';
import queryString from 'query-string';
import { useLocation } from 'react-router';
const osName = platform();
const LaunchParamsContext = React.createContext({ platform: osName });

export const LaunchParamsProvider = ({ children }) => {
  const { search } = useLocation();
  const launchParams = queryString.parse(search);

  const isDesktop = /desktop-*/gim.test(launchParams.vk_platform);

  return (
    <LaunchParamsContext.Provider
      value={{ launchParams, platform: osName, isDesktop }}
    >
      {children}
    </LaunchParamsContext.Provider>
  );
};

LaunchParamsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default LaunchParamsContext;
