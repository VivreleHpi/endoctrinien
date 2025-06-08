
import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  translations: {
    quizTitle: string;
    submitAnswer: string;
    nextQuestion: string;
    correctAnswer: string;
    wrongAnswer: string;
    yourScore: string;
    playAgain: string;
    quizCompleted: string;
    finalScore: string;
    viewExplanation: string;
  };
}

const QuizView: React.FC<QuizViewProps> = ({ questions, translations }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  
  // Shuffle options for the current question
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);


  const handleAnswerSelect = (optionText: string) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(optionText);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correctAnswerText = currentQuestion.options.find(opt => opt.isCorrect)?.text;
    if (selectedAnswer === correctAnswerText) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setScore(0);
    setIsQuizOver(false);
  };

  if (questions.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Aucune question de quiz disponible.</p>;
  }

  if (isQuizOver) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6 text-endocrine-primary dark:text-blue-300">{translations.quizCompleted}</h2>
        <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
          {translations.finalScore} {score} / {questions.length}
        </p>
        <button
          onClick={handlePlayAgain}
          className="px-8 py-3 bg-endocrine-accent hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md transition-colors text-lg"
        >
          {translations.playAgain}
        </button>
      </div>
    );
  }
  
  const isCorrect = selectedAnswer === currentQuestion.options.find(opt => opt.isCorrect)?.text;

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center text-endocrine-primary dark:text-blue-300">{translations.quizTitle}</h2>
      
      <div className="w-full max-w-2xl bg-endocrine-light-surface dark:bg-endocrine-dark-surface p-6 rounded-xl shadow-2xl">
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Question {currentQuestionIndex + 1} / {questions.length} - {translations.yourScore} {score}
        </div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">{currentQuestion.category}</span>
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">{currentQuestion.difficulty}</span>
        </div>
        <p className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 min-h-[60px]">{currentQuestion.questionText}</p>
        
        <div className="space-y-3 mb-6">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option.text)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-150
                ${selectedAnswer === option.text 
                  ? (showFeedback ? (option.isCorrect ? 'bg-green-100 dark:bg-green-800 border-green-500 dark:border-green-400 ring-2 ring-green-500' : 'bg-red-100 dark:bg-red-800 border-red-500 dark:border-red-400 ring-2 ring-red-500') : 'bg-blue-100 dark:bg-blue-800 border-endocrine-primary dark:border-blue-400')
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}
                ${showFeedback && option.isCorrect && 'bg-green-100 dark:bg-green-800 border-green-500 dark:border-green-400 font-semibold'}
                ${showFeedback && !option.isCorrect && selectedAnswer === option.text && 'bg-red-100 dark:bg-red-800 border-red-500 dark:border-red-400'}
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`p-3 mb-4 rounded-md text-center font-medium
            ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'}`}>
            {isCorrect ? translations.correctAnswer : translations.wrongAnswer}
            <button 
              onClick={() => setShowExplanation(!showExplanation)} 
              className="ml-2 text-sm underline hover:text-opacity-70"
            >
              ({translations.viewExplanation})
            </button>
          </div>
        )}

        {showFeedback && showExplanation && (
            <div className="p-3 mb-4 rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm">
                <strong>Explication :</strong> {currentQuestion.explanation}
            </div>
        )}

        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full px-6 py-3 bg-endocrine-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50"
          >
            {translations.submitAnswer}
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="w-full px-6 py-3 bg-endocrine-accent hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            {translations.nextQuestion}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
