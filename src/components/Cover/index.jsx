import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Div } from '@vkontakte/vkui';

import Avatar from 'components/Avatar';

import './styles.scss';

const Cover = ({ src, title, className }) => (
  <Div className={classnames('cover', className)}>
    <Avatar className="cover__avatar" src={src} />
    <p className="cover__title">{title}</p>
  </Div>
);

Cover.propTypes = {
  src: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default Cover;
