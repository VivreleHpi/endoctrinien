import React, { useState, useMemo } from 'react';
import { FlashcardData } from '../types';
import { ALL_FLASHCARDS } from '../constants';

interface FlashcardViewProps {
  translations: {
    flashcardsTitle: string;
    flipCard: string;
    nextCard: string;
    prevCard: string;
  }
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ translations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'débutant' | 'intermédiaire' | 'avancé'>('all');

  const filteredCards = useMemo(() => {
    if (selectedDifficulty === 'all') return ALL_FLASHCARDS;
    return ALL_FLASHCARDS.filter(card => card.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const currentCard = filteredCards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (!currentCard) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Aucune flashcard disponible pour ce niveau.</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎴 {translations.flashcardsTitle}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Testez vos connaissances avec nos cartes interactives !
          </p>
          
          {/* Difficulty Filter */}
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg mb-6">
            {(['all', 'débutant', 'intermédiaire', 'avancé'] as const).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedDifficulty(level);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedDifficulty === level
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {level === 'all' ? '🌟 Tous' : 
                 level === 'débutant' ? '🟢 Débutant' :
                 level === 'intermédiaire' ? '🟡 Intermédiaire' : '🔴 Avancé'}
              </button>
            ))}
          </div>
        </div>

        {/* Card Counter */}
        <div className="text-center mb-6">
          <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
            Carte {currentIndex + 1} sur {filteredCards.length}
          </span>
        </div>

        {/* Flashcard */}
        <div className="relative mx-auto max-w-lg">
          <div 
            className={`relative w-full h-96 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={flipCard}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-white">
              <div className="text-6xl mb-4">{currentCard.emoji}</div>
              <h3 className="text-2xl font-bold text-center mb-4">{currentCard.glandName}</h3>
              {currentCard.rectoQuestion && (
                <p className="text-lg text-center opacity-90">{currentCard.rectoQuestion}</p>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{currentCard.category}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {currentCard.difficulty === 'débutant' ? '🟢' :
                   currentCard.difficulty === 'intermédiaire' ? '🟡' : '🔴'} {currentCard.difficulty}
                </span>
              </div>
              <div className="absolute bottom-2 right-2 text-xs opacity-70">
                👆 Cliquez pour retourner
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-2xl p-6 flex flex-col justify-center text-white">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{currentCard.emoji}</div>
                <h3 className="text-xl font-bold mb-4">{currentCard.glandName}</h3>
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-sm leading-relaxed text-center">{currentCard.versoContent}</p>
              </div>
              <div className="absolute bottom-2 right-2 text-xs opacity-70">
                👆 Cliquez pour retourner
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            ⬅️ {translations.prevCard}
          </button>
          
          <button
            onClick={flipCard}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold"
          >
            🔄 {translations.flipCard}
          </button>
          
          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            {translations.nextCard} ➡️
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardView;