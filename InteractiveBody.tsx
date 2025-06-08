
import React from 'react';
import { Gland } from '../types';
import { ALL_GLANDS } from '../constants';

interface InteractiveBodyProps {
  onGlandSelect: (gland: Gland) => void;
  selectGlandPrompt: string;
}

// URL de l'image fournie par l'utilisateur
const USER_PROVIDED_IMAGE_URL = "https://i.imgur.com/gKk9z2C.png";

const InteractiveBody: React.FC<InteractiveBodyProps> = ({ onGlandSelect, selectGlandPrompt }) => {
  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-endocrine-primary dark:text-blue-300">
        Le Système Endocrinien Humain
      </h2>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">{selectGlandPrompt}</p>
      
      <div 
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-[2/3] min-h-96 mx-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden"
        aria-label="Représentation schématique du système endocrinien humain" 
      >
        <img
          src={USER_PROVIDED_IMAGE_URL}
          alt="Schéma du système endocrinien humain avec principales glandes"
          className="block w-full h-full object-contain"
        />
        {/* Les pastilles interactives sur l'image ont été supprimées selon la demande de l'utilisateur. */}
        {/* L'interaction se fait maintenant principalement via la légende ci-dessous. */}
      </div>

       <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 w-full max-w-4xl">
         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">Légende des Glandes</h3>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {ALL_GLANDS.map((gland) => (
              <button
                key={`legend-${gland.id}`}
                onClick={() => onGlandSelect(gland)}
                className={`p-2 rounded-lg ${gland.color} text-white text-xs sm:text-sm font-medium shadow-md hover:opacity-80 transition-opacity flex items-center justify-center space-x-1`}
                title={`Ouvrir les détails pour ${gland.name}`}
                aria-label={`Information sur ${gland.name}`}
              >
                <span className="text-base">{gland.emoji}</span>
                <span>{gland.name}</span>
              </button>
            ))}
          </div>
       </div>
    </div>
  );
};

export default InteractiveBody;