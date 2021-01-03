import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

const Avatar = ({ src, className, alt = '' }) => (
  <div className={classnames('avatar', className)}>
    <img src={src} alt={alt} />
  </div>
);

Avatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
