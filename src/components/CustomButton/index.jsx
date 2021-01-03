/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

const CustomButton = ({
  children,
  onClick,
  className = '',
  type = '',
  ...props
}) => (
  <button
    type="button"
    onClick={onClick}
    className={classnames('custom-button', className, {
      [`custom-button_${type}`]: type,
    })}
    {...props}
  >
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CustomButton;
