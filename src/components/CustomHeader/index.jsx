import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { platform, IOS, Div } from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Logo from 'components/Logo';
import LaunchParamsContext from 'context/launchParamsContext';

import './styles.scss';

const osName = platform();

const CustomHeader = ({ withBack = false, onBack, isLargeLogo = false }) => {
  const { isDesktop } = useContext(LaunchParamsContext);
  const logoSize = useMemo(() => {
    if (isLargeLogo) {
      return isDesktop ? 278 : 166;
    }

    return isDesktop ? 138 : 84;
  }, [isLargeLogo, isDesktop]);

  return (
    <Div className="custom-header">
      <div className="custom-header__before">
        {withBack ? (
          <PanelHeaderButton
            onClick={onBack}
            data-to="home"
            style={{ color: '#e5e823', marginLeft: '10px' }}
          >
            {osName === IOS ? (
              <Icon28ChevronBack fill="#e5e823" width={30} />
            ) : (
              <Icon24Back fill="#e5e823" width={30} />
            )}
            Назад
          </PanelHeaderButton>
        ) : null}
      </div>
      <div className="custom-header__content">
        <Logo size={logoSize} />
      </div>
      <div className="custom-header__after"></div>
    </Div>
    // <PanelHeader
    //   transparent
    //   separator={false}
    //   left={
    //     withBack ? (
    //       <PanelHeaderButton
    //         onClick={onBack}
    //         data-to="home"
    //         style={{ color: '#e5e823', marginLeft: '10px' }}
    //       >
    //         {osName === IOS ? (
    //           <Icon28ChevronBack fill="#e5e823" width={30} />
    //         ) : (
    //           <Icon24Back fill="#e5e823" width={30} />
    //         )}
    //         Назад
    //       </PanelHeaderButton>
    //     ) : null
    //   }
    // >
    //   <Logo size={logoSize} />
    // </PanelHeader>
  );
};

CustomHeader.propTypes = {
  onBack: PropTypes.func,
  withBack: PropTypes.bool,
  isLargeLogo: PropTypes.bool,
};

export default CustomHeader;
