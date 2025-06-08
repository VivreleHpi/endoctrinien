import React from 'react';

interface HumanBodyIllustrationProps {
  gender: 'male' | 'female';
  className?: string;
}

const HumanBodyIllustration: React.FC<HumanBodyIllustrationProps> = ({ gender, className = "" }) => {
  const baseColor = "#E8F4FD";
  const skinColor = "#F4C2A1";
  const hairColor = gender === 'male' ? "#8B4513" : "#D2691E";
  
  return (
    <svg 
      viewBox="0 0 200 400" 
      className={`${className} drop-shadow-lg`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="200" height="400" fill="transparent"/>
      
      {/* Head */}
      <ellipse cx="100" cy="50" rx="35" ry="40" fill={skinColor} stroke="#D4A574" strokeWidth="2"/>
      
      {/* Hair */}
      {gender === 'male' ? (
        <path d="M 70 25 Q 100 15 130 25 Q 130 35 125 40 Q 100 20 75 40 Q 70 35 70 25\" fill={hairColor}/>
      ) : (
        <path d="M 65 20 Q 100 10 135 20 Q 140 50 130 60 Q 100 15 70 60 Q 60 50 65 20" fill={hairColor}/>
      )}
      
      {/* Eyes */}
      <circle cx="88" cy="45" r="3" fill="#2563EB"/>
      <circle cx="112" cy="45" r="3" fill="#2563EB"/>
      
      {/* Smile */}
      <path d="M 90 55 Q 100 62 110 55" stroke="#8B4513" strokeWidth="2" fill="none"/>
      
      {/* Neck */}
      <rect x="90" y="85" width="20" height="15" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      
      {/* Torso */}
      <ellipse cx="100" cy="180" rx="50" ry="80" fill={baseColor} stroke="#3B82F6" strokeWidth="2"/>
      
      {/* Arms */}
      <ellipse cx="60" cy="140" rx="15" ry="50" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      <ellipse cx="140" cy="140" rx="15" ry="50" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      
      {/* Hands */}
      <circle cx="60" cy="190" r="12" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      <circle cx="140" cy="190" r="12" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      
      {/* Lower body */}
      <ellipse cx="100" cy="300" rx="40" ry="60" fill={baseColor} stroke="#3B82F6" strokeWidth="2"/>
      
      {/* Legs */}
      <ellipse cx="80" cy="350" rx="12" ry="40" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      <ellipse cx="120" cy="350" rx="12" ry="40" fill={skinColor} stroke="#D4A574" strokeWidth="1"/>
      
      {/* Feet */}
      <ellipse cx="80" cy="385" rx="8" ry="12" fill="#4B5563"/>
      <ellipse cx="120" cy="385" rx="8" ry="12" fill="#4B5563"/>
      
      {/* Gender-specific features */}
      {gender === 'female' && (
        <>
          {/* Dress outline */}
          <path d="M 60 220 Q 100 210 140 220 L 130 280 Q 100 290 70 280 Z" 
                fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="3,3"/>
        </>
      )}
      
      {gender === 'male' && (
        <>
          {/* Shirt outline */}
          <rect x="70" y="120" width="60" height="40" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3"/>
        </>
      )}
      
      {/* Medical cross symbol */}
      <g transform="translate(170, 20)">
        <rect x="-8" y="-2" width="16" height="4" fill="#EF4444"/>
        <rect x="-2" y="-8" width="4" height="16" fill="#EF4444"/>
      </g>
    </svg>
  );
};

export default HumanBodyIllustration;