import React, { useRef } from "react";
import { Icon } from "../../shared/icon";
import { throttle } from "lodash";
import "./sound.scss";

export const Sound = ({ soundLevel, setSoundLevel }) => {
  const handle = useRef(null);
  const isDragging = useRef(false);
  const sound = useRef(null);
  const soundPercentage = useRef(soundLevel);
  const previousOffset = useRef(0);

  const debounceEmitter = throttle(() => {
    setSoundLevel(soundPercentage.current);
  }, 1000);

  const onMouseRelease = () => {
    if (isDragging.current) {
      isDragging.current = false;
      sound.current.parentElement.classList.remove('sound__progress-active');
    }
  };

  const onMouseDown = (event) => {
    event.stopPropagation();
    if (event.target.className === "sound__progress__bar__door-handle") {
        sound.current.parentElement.classList.add('sound__progress-active');
        isDragging.current = true;
    }
  };

  const onMouseMove = (event) => {
    event.stopPropagation();
    if (isDragging.current) {
      const dif = event.nativeEvent.screenY - previousOffset.current;
      soundPercentage.current = soundPercentage.current - dif;
      /** @type HTMLElement */ const bar = sound.current;

      if (soundPercentage.current < 0) {
        soundPercentage.current = 0;
      } else if (soundPercentage.current > 100) {
        soundPercentage.current = 100;
      }

      bar.style.height = `${soundPercentage.current}%`;

      debounceEmitter();
    }
    previousOffset.current = event.nativeEvent.screenY;
  };

  const onSetSound = (event) => {
    /** @type HTMLElement */ const bar = sound.current;
    const clientY = event.clientY;
    const distance = bar.parentElement.getBoundingClientRect().height;
    const ratio =
      ((clientY - bar.parentElement.getBoundingClientRect().y) / distance) *
      100;
    soundPercentage.current = 100 - ratio;

    if (soundPercentage.current < 7) {
      soundPercentage.current = 0;
    } else if (soundPercentage.current > 85) {
      soundPercentage.current = 100;
    }

    bar.style.height = `${soundPercentage.current}%`;
    debounceEmitter();
    isDragging.current = false;
  };

  return (
    <div
      draggable="false"
      className="sound"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseRelease}
      onMouseMove={onMouseMove}
    >
      <div className="sound__icon-container">
        {
          soundPercentage.current > 0 &&
          (
            <Icon
              onClick={null}
              className="sound__icon-container__icon"
              color="white"
              viewBox="0 0 100 100"
              size="30"
              name='sound'
            ></Icon>
          )
        }
        {
          soundPercentage.current === 0 &&
          (
            <Icon
              onClick={null}
              className="sound__icon-container__icon"
              color="white"
              viewBox="0 0 460 460"
              size="30"
              name='muted'
            ></Icon>
          )
        }
      </div>
      <div className="sound__wrapper"></div>
      <div onMouseDown={onSetSound} className="sound__progress">
        <div
          ref={sound}
          style={{ height: `${soundPercentage.current}%` }}
          className="sound__progress__bar"
        >
          <div ref={handle} className="sound__progress__bar__door-handle"></div>
        </div>
      </div>
    </div>
  );
};
