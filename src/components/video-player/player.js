import React from 'react';
import './player.scss';

export const Player = ({ video }) => {
    return (
        <div className="player">
            <video controls>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    )
}
