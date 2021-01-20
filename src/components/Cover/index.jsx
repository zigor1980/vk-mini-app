import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Div } from '@vkontakte/vkui';

import Avatar from 'components/Avatar';
import './styles.scss';
import LaunchParamsContext from 'context/launchParamsContext';

const Cover = ({ src, title, className }) => {
  const { isDesktop } = useContext(LaunchParamsContext);

  return (
    <div
      className={classnames('cover-shadow', {
        'cover-shadow_mobile': !isDesktop,
      })}
    >
      <Div className={classnames('cover', className)}>
        <Avatar className="cover__avatar" src={src} />
        <p className="cover__title">{title}</p>
      </Div>
    </div>
  );
};

Cover.propTypes = {
  src: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default Cover;
