import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppView, Gland, Hormone, Language, AppTranslations, ThemeContextType, LanguageContextType, QuizQuestion } from './types';
import { ALL_GLANDS, ALL_HORMONES, TRANSLATIONS, ALL_QUIZ_QUESTIONS } from './constants';
import InteractiveBody from './components/InteractiveBody';
import GlandDetailModal from './components/GlandDetailModal';
import HormoneDetailModal from './components/HormoneDetailModal';
import FlashcardView from './components/FlashcardView';
import LexiconView from './components/LexiconView';
import QuizView from './components/QuizView';
import { SunIcon, MoonIcon, BodyIcon, DnaIcon, CardStackIcon, BookOpenIcon, AcademicCapIcon } from './components/IconComponents';

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
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${currentView === view 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'}`}
      aria-current={currentView === view ? 'page' : undefined}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );

  const renderView = () => {
    switch (currentView) {
      case 'interactive_body':
        return <InteractiveBody onGlandSelect={handleGlandSelect} selectGlandPrompt={translations.selectGlandPrompt} />;
      case 'hormones_list':
        return (
          <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  🧬 {translations.navHormones}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Découvrez les messagers chimiques de votre corps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_HORMONES.map(hormone => (
                  <div 
                    key={hormone.id} 
                    className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 dark:border-gray-700" 
                    onClick={() => { setSelectedHormone(hormone); setIsHormoneModalOpen(true); }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{hormone.emoji}</span>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {hormone.nom}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                        {hormone.glande_nom}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {hormone.fonction.substring(0, 120)}...
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {hormone.type}
                      </span>
                      <span className="text-blue-500 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        En savoir plus →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
          <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🧬 EndoExplorer
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <NavItem view="interactive_body" label={translations.navInteractiveBody} icon={<BodyIcon className="h-5 w-5"/>} />
                  <NavItem view="hormones_list" label={translations.navHormones} icon={<DnaIcon className="h-5 w-5"/>} />
                  <NavItem view="flashcards" label={translations.navFlashcards} icon={<CardStackIcon className="h-5 w-5"/>} />
                  <NavItem view="lexicon" label={translations.navLexicon} icon={<BookOpenIcon className="h-5 w-5"/>} />
                  <NavItem view="quiz" label={translations.navQuiz} icon={<AcademicCapIcon className="h-5 w-5"/>} />
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110" 
                    aria-label={theme === 'light' ? translations.navDarkMode : translations.navLightMode}
                  >
                    {theme === 'light' ? <MoonIcon className="h-6 w-6 text-gray-700" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
                  </button>
                  <div className="relative">
                     <select 
                        value={language} 
                        onChange={(e) => handleLanguageChange(e.target.value as Language)}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
                        aria-label="Select language"
                      >
                        <option value="fr">🇫🇷 FR</option>
                        <option value="en">🇬🇧 EN</option>
                      </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 flex justify-around">
                <NavItem view="interactive_body" label="" icon={<BodyIcon className="h-6 w-6"/>} />
                <NavItem view="hormones_list" label="" icon={<DnaIcon className="h-6 w-6"/>} />
                <NavItem view="flashcards" label="" icon={<CardStackIcon className="h-6 w-6"/>} />
                <NavItem view="lexicon" label="" icon={<BookOpenIcon className="h-6 w-6"/>} />
                <NavItem view="quiz" label="" icon={<AcademicCapIcon className="h-6 w-6"/>} />
            </div>
          </nav>

          <main>
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
          
          <footer className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-blue-900 py-8 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🎓</span>
                <span className="font-semibold">EndoExplorer</span>
              </div>
              <p>&copy; {new Date().getFullYear()} Explorateur du Système Endocrinien</p>
              <p className="text-xs mt-1">Plateforme éducative pour futurs médecins • Données à but éducatif uniquement</p>
            </div>
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