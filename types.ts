
export interface Gland {
  id: string;
  name: string;
  description: string;
  position: { top: string; left: string };
  color: string;
  hormone_ids: string[];
  emoji: string;
  common_issues_summary?: string; // For GlandDetailModal
  genderSpecificity?: 'male' | 'female' | 'both'; // Added for dual body display
}

export interface PathologyInfo {
  name: string;
  description?: string;
  symptoms?: string[];
  causes_details?: string;
  care_info?: string;
  prevention_info?: string;
}

export interface Hormone {
  id: string;
  nom: string;
  emoji: string;
  glande_id: string;
  glande_nom: string;
  type: string;
  structure_chimique_details?: string;
  fonction: string;
  mecanisme_action?: string;
  organes_cibles: string[];
  regulation?: string;
  pathologies_associees?: string[]; // Conserver pour compatibilité ou résumé simple
  pathologies_details?: PathologyInfo[]; // Nouvelle structure détaillée
  valeurs_normales?: string;
  refs_scientifiques?: string[];
  videos?: string[];
  rythme_circadien?: string;
  cas_cliniques?: string[];
  interactions_hormonales?: string[];
  age_variations?: string;
  grossesse_impact?: string;
}

export interface FlashcardData {
  id: string;
  glandName: string; // Nom de la glande (affiché sur le recto)
  imageUrl?: string; // URL de l'image (Wikipedia/autre) pour le recto
  rectoQuestion?: string; // Question alternative si pas d'image principale
  versoContent: string; // Informations détaillées au verso
  category: string; // e.g., Glande, Hormone Majeure, Fonction Vitale
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  emoji: string; // Emoji de la glande associée
}

export interface LexiconEntry {
  id: string;
  term: string;
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  emoji?: string;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string; // Explanation for the correct answer
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  category: string; // e.g., Glandes, Hormones, Pathologies
}


export type AppView = 'interactive_body' | 'hormones_list' | 'flashcards' | 'lexicon' | 'quiz';

export type Language = 'fr' | 'en';

export interface AppTranslations {
  navInteractiveBody: string;
  navHormones: string;
  navFlashcards: string;
  navLexicon: string;
  navQuiz: string; // For Quiz navigation
  navDarkMode: string;
  navLightMode: string;
  selectGlandPrompt: string;
  glandDetailsTitle: string;
  hormonesProduced: string;
  hormoneInfoTitle: string;
  gland: string;
  type: string;
  targetOrgans: string;
  mainFunction: string;
  associatedPathologies: string;
  pathologyName: string;
  pathologyDescription: string;
  symptoms: string;
  causes: string;
  careAndTreatment: string;
  prevention: string;
  pathologiesSectionTitle: string;
  normalValues: string;
  flashcardsTitle: string;
  flipCard: string;
  nextCard: string;
  prevCard: string;
  lexiconTitle: string;
  searchTerm: string;
  noResults: string;
  close: string;
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
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: AppTranslations;
}