import React, { useState } from "react";
import { Icon } from "../../shared/icon";
import './subtitles.scss';

export const Subtitles = () => {
   const [audio] = useState(['English [Original]', 'French [FR]']);
   const [subtitle] = useState(['Portuguese', 'English', 'Deactivated']);
   const [selectedAudio, setSelectedAudio] = useState(0);
   const [selectedSubtitle, setSelectedSubtitle] = useState(0);

  return (
    <div className="subtitles">
      <Icon
        onClick={null}
        className="subtitles__icon"
        color="white"
        viewBox="0 0 500 500"
        size="25"
        name="subtitle"
      ></Icon>
      <div className="subtitles__container">
          <div className="subtitles__container__category">
              Audio
              {
                  audio.map((value, index) => {
                    return (
                        <div onClick={() => setSelectedAudio(index)} key={`audio_${index}`} className="subtitles__container__category__option">
                            { selectedAudio === index && 
                                <Icon
                                    onClick={null}
                                    className="subtitles__container__category__option__icon"
                                    color="white"
                                    viewBox="0 0 420 400"
                                    size="13"
                                    name="checked"
                                ></Icon>
                            }
                            {value}
                        </div>
                    )
                  })
              }
          </div>
          <div className="subtitles__container__category">
              Subtitles
              {
                  subtitle.map((value, index) => {
                    return (
                        <div onClick={() => setSelectedSubtitle(index)} key={`audio_${index}`} className="subtitles__container__category__option">
                            { selectedSubtitle === index && 
                                <Icon
                                    onClick={null}
                                    className="subtitles__container__category__option__icon"
                                    color="white"
                                    viewBox="0 0 420 400"
                                    size="13"
                                    name="checked"
                                ></Icon>
                            }
                            {value}
                        </div>
                    )
                  })
              }
          </div>
      </div>
    </div>
  );
};
