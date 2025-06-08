import React, { useState } from 'react';
import { Gland } from '../types';
import { ALL_GLANDS } from '../constants';
import HumanBodyIllustration from './HumanBodyIllustration';
import GlandMarker from './GlandMarker';

interface InteractiveBodyProps {
  onGlandSelect: (gland: Gland) => void;
  selectGlandPrompt: string;
}

const InteractiveBody: React.FC<InteractiveBodyProps> = ({ onGlandSelect, selectGlandPrompt }) => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');
  
  // Filter glands based on gender specificity
  const visibleGlands = ALL_GLANDS.filter(gland => 
    gland.genderSpecificity === 'both' || gland.genderSpecificity === selectedGender
  );

  return (
    <div className="p-4 md:p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧬 Explorateur du Système Endocrinien
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Découvre les glandes et hormones qui régulent ton corps ! 
          <br className="hidden md:block"/>
          Une aventure scientifique pour futurs médecins 👩‍⚕️👨‍⚕️
        </p>
        <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3">Choisir :</span>
          <button
            onClick={() => setSelectedGender('female')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedGender === 'female' 
                ? 'bg-pink-500 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            👩 Femme
          </button>
          <button
            onClick={() => setSelectedGender('male')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedGender === 'male' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            👨 Homme
          </button>
        </div>
      </div>

      {/* Interactive Body Section */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8 max-w-md mx-auto">
        <div className="relative">
          <HumanBodyIllustration 
            gender={selectedGender} 
            className="w-full h-auto max-w-sm mx-auto"
          />
          
          {/* Gland Markers */}
          {visibleGlands.map((gland) => (
            <GlandMarker
              key={gland.id}
              gland={gland}
              onClick={onGlandSelect}
              style={{
                top: gland.position.top,
                left: gland.position.left,
              }}
            />
          ))}
        </div>
        
        {/* Instruction */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            💡 {selectGlandPrompt}
          </p>
        </div>
      </div>

      {/* Legend Section */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
          🏷️ Guide des Glandes Endocrines
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleGlands.map((gland) => (
            <button
              key={`legend-${gland.id}`}
              onClick={() => onGlandSelect(gland)}
              className={`group p-4 rounded-xl ${gland.color} text-white shadow-lg hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-200 text-left
                         border-2 border-white/20 hover:border-white/40`}
              title={`Découvrir ${gland.name}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{gland.emoji}</span>
                <h4 className="font-bold text-sm leading-tight">{gland.name}</h4>
              </div>
              <p className="text-xs opacity-90 group-hover:opacity-100 transition-opacity">
                {gland.description.substring(0, 80)}...
              </p>
            </button>
          ))}
        </div>
        
        {/* Educational Note */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                Le saviez-vous ?
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Le système endocrinien est comme un réseau de communication chimique dans votre corps. 
                Chaque glande produit des hormones spécifiques qui voyagent dans le sang pour transmettre 
                des messages importants à différents organes !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBody;