import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import VideoBackground from 'components/VideoBackground';
import LaunchParamsContext from 'context/launchParamsContext';
import CustomHeader from 'components/CustomHeader';
import Footer from 'components/Footer';

import './styles.scss';

const CustomPanel = ({
  id,
  children,
  className,
  isLargeLogo,
  withBack,
  onBack,
  withVideoBackground,
  videoSrc,
  centered = false,
}) => {
  const { isDesktop } = useContext(LaunchParamsContext);

  return (
    <Panel id={id} className={classnames('', className)}>
      {withVideoBackground && videoSrc ? (
        <VideoBackground
          videoSrc={videoSrc}
          className={classnames('Panel__video-bg', {
            'Panel__video-bg_mobile': !isDesktop,
          })}
        />
      ) : null}
      <CustomHeader
        isLargeLogo={isLargeLogo}
        withBack={withBack}
        onBack={onBack}
      />
      <Div
        className={classnames('Panel__content', {
          Panel__content_centered: centered && !isDesktop,
        })}
      >
        {children}
      </Div>
      <Footer />
    </Panel>
  );
};

CustomPanel.propTypes = {
  withVideoBackground: PropTypes.bool,
  videoSrc: PropTypes.string,
  withBack: PropTypes.bool,
  centered: PropTypes.bool,
  onBack: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  isLargeLogo: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default CustomPanel;
