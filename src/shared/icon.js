import React from 'react';
import Icons from '../assets/icon.svg';

export const Icon = ({ name, color, size, className, onClick, viewBox }) => {
    return (
        <svg onClick={onClick} className={className} width={size} viewBox={viewBox} fill={color}>
            <use href={Icons + `#${name}`} />
        </svg>
    )
}