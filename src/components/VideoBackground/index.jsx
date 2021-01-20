import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const VideoBackground = ({ videoSrc, className }) => {
  const [isVisible, setVisibility] = useState(false);
  const videoRef = useRef(null);
  const onDataLoaded = () => {
    setVisibility(true);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener('loadeddata', onDataLoaded);

    return () => {
      videoElement.removeEventListener('loadeddata', onDataLoaded);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <video
      ref={videoRef}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      autoPlay
      muted
      loop
      playsInline
      id="myVideo"
      className={className}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

VideoBackground.propTypes = {
  className: PropTypes.string,
  videoSrc: PropTypes.string,
};

export default VideoBackground;
