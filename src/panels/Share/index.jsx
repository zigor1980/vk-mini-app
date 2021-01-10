import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import PopoutWrapper from '@vkontakte/vkui/dist/components/PopoutWrapper/PopoutWrapper';
import { Div } from '@vkontakte/vkui';

import AudioPlayer from 'components/Player';
import CustomPanel from 'components/CustomPanel';
import Cover from 'components/Cover';
import CustomButton from 'components/CustomButton';
import './styles.scss';

const Share = ({ id, setPopout }) => {
  useEffect(() => {
    setPopout(
      <PopoutWrapper hasMask>
        <ScreenSpinner />
      </PopoutWrapper>,
    );
    setTimeout(() => setPopout(null), 2000);
    // eslint-disable-next-line
  }, []);

  return (
    <CustomPanel id={id} className="share-screen">
      <div style={{ padding: '0 15px' }}>
        <Cover />
        <Div style={{ padding: 0 }}>
          <AudioPlayer />
        </Div>
      </div>
      <div className="share-screen__footer">
        <span className="general-header ">
          Хотите услышать, как звучит ваша душа?
        </span>
        <CustomButton className="share-screen__button share-screen__button_agree">
          Да
        </CustomButton>
      </div>
    </CustomPanel>
  );
};

Share.propTypes = {
  id: PropTypes.string.isRequired,
  //   go: PropTypes.func.isRequired,
  setPopout: PropTypes.func,
};

export default Share;
