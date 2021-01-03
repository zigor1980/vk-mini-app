import React from 'react';
import PropTypes from 'prop-types';

import logoSrc from '../../img/logo.png';
import './styles.scss';

const Logo = ({ size }) => (
  <img
    src={logoSrc}
    alt="logo"
    style={{
      width: size ? `${size}px` : null,
    }}
    className="logo"
  />
);

Logo.propTypes = {
  size: PropTypes.number,
};

export default Logo;
