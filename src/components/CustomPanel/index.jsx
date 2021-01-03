import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

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
}) => (
  <Panel id={id} className={classnames('', className)}>
    <CustomHeader
      isLargeLogo={isLargeLogo}
      withBack={withBack}
      onBack={onBack}
    />
    <Div className="Panel__content">{children}</Div>
    <Footer />
  </Panel>
);

CustomPanel.propTypes = {
  withBack: PropTypes.bool,
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
