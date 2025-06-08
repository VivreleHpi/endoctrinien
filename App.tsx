
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppView, Gland, Hormone, Language, AppTranslations, ThemeContextType, LanguageContextType, QuizQuestion } from './types';
import { ALL_GLANDS, ALL_HORMONES, TRANSLATIONS, ALL_QUIZ_QUESTIONS } from './constants';
import InteractiveBody from './components/InteractiveBody';
import GlandDetailModal from './components/GlandDetailModal';
import HormoneDetailModal from './components/HormoneDetailModal';
import FlashcardView from './components/FlashcardView';
import LexiconView from './components/LexiconView';
import QuizView from './components/QuizView'; // Import QuizView
import { SunIcon, MoonIcon, BodyIcon, DnaIcon, CardStackIcon, BookOpenIcon, GlobeIcon, AcademicCapIcon } from './components/IconComponents'; // Added AcademicCapIcon for Quiz

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('interactive_body');
  const [selectedGland, setSelectedGland] = useState<Gland | null>(null);
  const [selectedHormone, setSelectedHormone] = useState<Hormone | null>(null);
  const [isGlandModalOpen, setIsGlandModalOpen] = useState(false);
  const [isHormoneModalOpen, setIsHormoneModalOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);
  
  const translations = useMemo(() => TRANSLATIONS[language], [language]);

  const handleGlandSelect = useCallback((gland: Gland) => {
    setSelectedGland(gland);
    setIsGlandModalOpen(true);
  }, []);

  const handleHormoneSelectFromGlandModal = useCallback((hormone: Hormone) => {
    setSelectedHormone(hormone);
    setIsGlandModalOpen(false); 
    setIsHormoneModalOpen(true); 
  }, []);
  
  const closeGlandModal = useCallback(() => {
    setIsGlandModalOpen(false);
    setSelectedGland(null);
  }, []);

  const closeHormoneModal = useCallback(() => {
    setIsHormoneModalOpen(false);
    setSelectedHormone(null);
  }, []);

  const NavItem: React.FC<{ view: AppView; label: string; icon: React.ReactNode }> = ({ view, label, icon }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                  ${currentView === view 
                    ? 'bg-endocrine-primary text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
      aria-current={currentView === view ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const renderView = () => {
    switch (currentView) {
      case 'interactive_body':
        return <InteractiveBody onGlandSelect={handleGlandSelect} selectGlandPrompt={translations.selectGlandPrompt} />;
      case 'hormones_list':
        return (
            <div className="p-4 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-endocrine-primary dark:text-blue-300">{translations.navHormones}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_HORMONES.map(hormone => (
                        <div key={hormone.id} className="bg-endocrine-light-surface dark:bg-endocrine-dark-surface p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => { setSelectedHormone(hormone); setIsHormoneModalOpen(true); }}>
                            <h3 className="text-xl font-semibold text-endocrine-primary dark:text-blue-400">{hormone.emoji} {hormone.nom}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Glande: {hormone.glande_nom}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{hormone.fonction.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'flashcards':
        return <FlashcardView translations={{flashcardsTitle: translations.flashcardsTitle, flipCard: translations.flipCard, nextCard: translations.nextCard, prevCard: translations.prevCard }} />;
      case 'lexicon':
        return <LexiconView translations={{lexiconTitle: translations.lexiconTitle, searchTerm: translations.searchTerm, noResults: translations.noResults }} />;
      case 'quiz':
        return <QuizView questions={ALL_QUIZ_QUESTIONS} translations={{ quizTitle: translations.quizTitle, submitAnswer: translations.submitAnswer, nextQuestion: translations.nextQuestion, correctAnswer: translations.correctAnswer, wrongAnswer: translations.wrongAnswer, yourScore: translations.yourScore, playAgain: translations.playAgain, quizCompleted: translations.quizCompleted, finalScore: translations.finalScore, viewExplanation: translations.viewExplanation }} />;
      default:
        return <InteractiveBody onGlandSelect={handleGlandSelect} selectGlandPrompt={translations.selectGlandPrompt} />;
    }
  };
  
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const languageContextValue = useMemo(() => ({ language, setLanguage: handleLanguageChange, translations }), [language, handleLanguageChange, translations]);


  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LanguageContext.Provider value={languageContextValue}>
        <div className="min-h-screen bg-endocrine-light-bg dark:bg-endocrine-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <nav className="bg-endocrine-light-surface dark:bg-endocrine-dark-surface shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <span className="font-bold text-xl text-endocrine-primary dark:text-blue-400">🧬 EndoExplorer</span>
                </div>
                <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                  <NavItem view="interactive_body" label={translations.navInteractiveBody} icon={<BodyIcon className="h-5 w-5"/>} />
                  <NavItem view="hormones_list" label={translations.navHormones} icon={<DnaIcon className="h-5 w-5"/>} />
                  <NavItem view="flashcards" label={translations.navFlashcards} icon={<CardStackIcon className="h-5 w-5"/>} />
                  <NavItem view="lexicon" label={translations.navLexicon} icon={<BookOpenIcon className="h-5 w-5"/>} />
                  <NavItem view="quiz" label={translations.navQuiz} icon={<AcademicCapIcon className="h-5 w-5"/>} />
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={theme === 'light' ? translations.navDarkMode : translations.navLightMode}>
                    {theme === 'light' ? <MoonIcon className="h-6 w-6 text-gray-700" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
                  </button>
                  <div className="relative">
                     <select 
                        value={language} 
                        onChange={(e) => handleLanguageChange(e.target.value as Language)}
                        className="p-2 rounded-md bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none appearance-none"
                        aria-label="Select language"
                      >
                        <option value="fr">FR 🇫🇷</option>
                        <option value="en">EN 🇬🇧</option>
                      </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden p-2 bg-endocrine-light-surface dark:bg-endocrine-dark-surface border-t border-gray-200 dark:border-gray-700 flex justify-around">
                <NavItem view="interactive_body" label="" icon={<BodyIcon className="h-6 w-6"/>} />
                <NavItem view="hormones_list" label="" icon={<DnaIcon className="h-6 w-6"/>} />
                <NavItem view="flashcards" label="" icon={<CardStackIcon className="h-6 w-6"/>} />
                <NavItem view="lexicon" label="" icon={<BookOpenIcon className="h-6 w-6"/>} />
                <NavItem view="quiz" label="" icon={<AcademicCapIcon className="h-6 w-6"/>} />
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {renderView()}
          </main>

          <GlandDetailModal 
            gland={selectedGland} 
            isOpen={isGlandModalOpen} 
            onClose={closeGlandModal}
            onHormoneSelect={handleHormoneSelectFromGlandModal}
            translations={{glandDetailsTitle: translations.glandDetailsTitle, hormonesProduced: translations.hormonesProduced}}
          />
          <HormoneDetailModal 
            hormone={selectedHormone} 
            isOpen={isHormoneModalOpen} 
            onClose={closeHormoneModal}
            translations={{
                hormoneInfoTitle: translations.hormoneInfoTitle,
                gland: translations.gland,
                type: translations.type,
                targetOrgans: translations.targetOrgans,
                mainFunction: translations.mainFunction,
                associatedPathologies: translations.associatedPathologies,
                pathologiesSectionTitle: translations.pathologiesSectionTitle,
                pathologyName: translations.pathologyName,
                pathologyDescription: translations.pathologyDescription,
                symptoms: translations.symptoms,
                causes: translations.causes,
                careAndTreatment: translations.careAndTreatment,
                prevention: translations.prevention,
                normalValues: translations.normalValues
            }}
          />
          <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12">
            <p>&copy; {new Date().getFullYear()} Explorateur du Système Endocrinien. Données à but éducatif uniquement.</p>
          </footer>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
