import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
  const subtitleRef = useRef(null);

  const setControlsVisible = useCallback(() => {
    /** @type HTMLElement */ const element = controls.current;
    element.classList.add("player__container__controls-active");
    clearTimeout(timeout.current);
    setVisible(true);

    timeout.current = setTimeout(() => {
      element.classList.remove("player__container__controls-active");
      setVisible(false);
    }, 3000);
  }, []);

  const setSoundLevel = useCallback((level) => {
    setControlsVisible();
    setSound(level);

    /** @type HTMLVideoElement */ const element = videoRef.current;
    element.muted = false;
    element.volume = level / 100;
  }, [ setControlsVisible ]);

  const playVideo = useCallback(() => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    playing ? element.pause() : element.play();
    setPlaying(!playing);
  }, [ playing ]);

  const setFullscreen = useCallback(() => {
    /** @type any */ const element = document.querySelector(
      ".player__container"
    );

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
  }, []);

  const setVideoProgress = useCallback(() => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    if (progressBar.current && element.buffered.length > 0) {
      progressBar.current.style.width = `${(element.buffered.end(element.buffered.length-1) / element.duration) * 100}%`;
      const percent = (element.currentTime / element.buffered.end(element.buffered.length-1)) * 100;
      progressBar.current.value = `${percent}`;
    }
  }, []);

  const setMinute = (event) => {
    /** @type HTMLVideoElement */ const element = videoRef.current;
    const offset = event.nativeEvent.offsetX / event.target.offsetWidth;
    element.currentTime = offset * element.duration;
  }

  const addSubtitle = (payload) => {
    /** @type HTMLVideoElement */ const video = videoRef.current;
    /** @type HTMLTrackElement */ const track = subtitleRef.current;

    if (payload.length > 0) {
      const dataStr = "data:text/vtt;charset=utf-8," + encodeURIComponent(payload);

      track.src = dataStr;
      video.textTracks[0].mode = 'showing';
    } else {
      track.src = null;
      video.textTracks[0].mode = 'hidden';
    }
  }

  useEffect(() => {
    if (isVisible) {
      setVideoProgress();
    }
  }, [ isVisible, setVideoProgress ]);

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
          <track ref={subtitleRef} kind="subtitles" label="English captions" default/>
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
                <div
                  onClick={setMinute}
                  className="player__container__controls__bottom__progress">
                  <progress
                    ref={progressBar}
                    max="100"
                    value="0"
                  ></progress>
                </div>
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
                  <Subtitles setSubtitle={addSubtitle}></Subtitles>
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
