import React, { Fragment, useRef, useState } from "react";
import { Icon } from "../../shared/icon";
import { Sound } from "../sound/sound";
import { Subtitles } from "../subtitles/subtitles";
import "./player.scss";

export const Player = ({ video }) => {
  const [isVisible, setVisible] = useState(false);
  const controls = useRef(null);
  const timeout = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(0);
  const videoRef = useRef(null);
  const progressBar = useRef(null);

  const setControlsVisible = () => {
    /** @type HTMLElement */ const element = controls.current;
    element.classList.add("player__container__controls-active");
    clearTimeout(timeout.current);
    setVisible(true);

    timeout.current = setTimeout(() => {
      element.classList.remove("player__container__controls-active");
      setVisible(false);
    }, 30000);
  };

  const setSoundLevel = (level) => {
    setControlsVisible();
    setSound(level);

    /** @type HTMLVideoElement */ const element = videoRef.current;
    element.muted = false;
    element.volume = level / 100;
  };

  const playVideo = () => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    playing ? element.pause() : element.play();
    setPlaying(!playing);
  };

  const setFullscreen = () => {
    /** @type HTMLVideoElement */ const element = document.querySelector(
      ".player__container"
    );
    element.requestFullscreen();
  };

  const setVideoProgress = (event) => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    const percent = (element.currentTime / element.duration) * 100;
    if (progressBar.current) {
      progressBar.current.value = `${percent}`;
    }
  }

  const setMinute = (event) => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    const offset = event.nativeEvent.offsetX / event.target.offsetWidth;
    element.currentTime = offset * element.duration;
  }

  return (
    <div className="player">
      <div className="player__container">
        <video
          onTimeUpdate={setVideoProgress}
          ref={videoRef}
          className="player__container__video"
          autoPlay
          muted
        >
          <source src={video} type="video/mp4" />
        </video>
        <div
          ref={controls}
          onMouseMove={setControlsVisible}
          className="player__container__controls"
        >
          {isVisible && (
            <Fragment>
              <div className="player__container__controls__top"></div>
              <div className="player__container__controls__bottom">
                <progress
                  ref={progressBar}
                  onClick={setMinute}
                  className="player__container__controls__bottom__progress"
                  max="100"
                  value="0"
                ></progress>
                <div className="player__container__controls__bottom__settings">
                  <Icon
                    onClick={playVideo}
                    className="player__container__controls__bottom__icon"
                    color="white"
                    viewBox="0 0 330 330"
                    size="20"
                    name={playing ? "pause" : "play"}
                  ></Icon>
                  <Sound
                    soundLevel={sound}
                    setSoundLevel={setSoundLevel}
                  ></Sound>
                  <div className="player__container__controls__bottom__information">
                    <span className="player__container__controls__bottom__information-title">
                      Game of thrones
                    </span>
                    <span className="player__container__controls__bottom__information-subtitle">
                      T1:E4 Amazing battle
                    </span>
                  </div>
                  <Subtitles></Subtitles>
                  <Icon
                    onClick={setFullscreen}
                    className="player__container__controls__bottom__icon margin-left-sm"
                    color="white"
                    viewBox="0 0 500 500"
                    size="23"
                    name="fullscreen"
                  ></Icon>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
