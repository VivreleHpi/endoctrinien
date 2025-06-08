import React from 'react';
import { Gland } from '../types';

interface GlandMarkerProps {
  gland: Gland;
  onClick: (gland: Gland) => void;
  style?: React.CSSProperties;
}

const GlandMarker: React.FC<GlandMarkerProps> = ({ gland, onClick, style }) => {
  return (
    <button
      onClick={() => onClick(gland)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                  w-8 h-8 md:w-10 md:h-10 rounded-full 
                  ${gland.color} text-white text-xs md:text-sm font-bold
                  shadow-lg hover:shadow-xl hover:scale-110 
                  transition-all duration-200 ease-in-out
                  border-2 border-white
                  flex items-center justify-center
                  animate-pulse hover:animate-none
                  focus:outline-none focus:ring-4 focus:ring-blue-300`}
      style={style}
      title={`${gland.emoji} ${gland.name}`}
      aria-label={`Découvrir ${gland.name}`}
    >
      <span className="text-lg">{gland.emoji}</span>
    </button>
  );
};

export default GlandMarker;