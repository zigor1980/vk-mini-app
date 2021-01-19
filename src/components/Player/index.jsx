import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';
import bridge from '@vkontakte/vk-bridge';
import ReactGA from 'react-ga';

import { formatTime } from './utils';
import './styles.scss';

const playIcon = (
  <svg
    width="25"
    height="32"
    viewBox="0 0 25 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0.769165L25 16.2692L0 31.7692V0.769165Z" fill="#84C8F7" />
  </svg>
);

const pauseIcon = (
  <svg
    width="23"
    height="28"
    viewBox="0 0 23 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="8" height="28" fill="#84C8F7" />
    <rect x="15" width="8" height="28" fill="#84C8F7" />
  </svg>
);

const Player = ({ src, title = 'Душа пользователя' }) => {
  const audioRef = useRef();
  const [isPlaying, setPlayState] = useState(false);
  const [progress, setProgress] = useState();
  const onPlay = () => {
    setPlayState(true);
  };
  const onPause = () => {
    setPlayState(false);
  };
  const onTimeUpdate = throttle(e => {
    const { duration } = audioRef.current;
    const audio = e.target;
    const currentProgress = ((audio.currentTime / duration) * 100).toFixed(2);
    setProgress(currentProgress);
  }, 100);

  const onSeek = value => {
    const { duration } = audioRef.current;
    audioRef.current.currentTime = duration * (value / 100);
  };

  useEffect(() => {
    audioRef.current.addEventListener('play', onPlay);
    audioRef.current.addEventListener('pause', onPause);
    audioRef.current.addEventListener('timeupdate', onTimeUpdate);
    bridge.subscribe(({ detail: { type } }) => {
      switch (type) {
        case 'VKWebAppViewHide': {
          audioRef.current.pause();

          break;
        }
        default:
          break;
      }
    });

    return () => {
      audioRef.current.removeEventListener('play', onPlay);
      // eslint-disable-next-line
      audioRef.current.removeEventListener('pause', onPause);
      // eslint-disable-next-line
      audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
    };
    // eslint-disable-next-line
  }, []);

  const play = () => {
    if (!isPlaying) {
      ReactGA.event({
        category: 'general',
        action: 'play',
      });
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="player">
      {/* eslint-disable-next-line */}
      <audio ref={audioRef} controls src={src} style={{ display: 'none' }}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <div className="player__controls">
        <button className="player__play-button" type="button" onClick={play}>
          {isPlaying ? pauseIcon : playIcon}
        </button>
      </div>
      <div className="player__track">
        <div className="player__meta">
          <span className="player__title">{title}</span>
          <span className="player__time">
            {formatTime(
              audioRef.current &&
                audioRef.current.duration * (progress / 100) * 1000,
            )}
          </span>
        </div>
        <Slider
          className="player__progress-bar"
          value={progress}
          min={0}
          max={100}
          step={0.01}
          onChange={onSeek}
        />
      </div>
    </div>
  );
};
Player.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default Player;
