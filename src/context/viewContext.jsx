import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { VIEWS } from 'constants/views';

const ViewContext = React.createContext({ view: null });

export const ViewProvider = ({ children }) => {
  const [view, setCurrentView] = useState(VIEWS.start);

  return (
    <ViewContext.Provider value={{ view, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  );
};

ViewProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ViewContext;
