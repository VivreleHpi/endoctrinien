
import React, { useState, useMemo } from 'react';
import { LexiconEntry } from '../types';
import { ALL_LEXICON_ENTRIES } from '../constants';

interface LexiconViewProps {
  translations: {
    lexiconTitle: string;
    searchTerm: string;
    noResults: string;
  }
}

const LexiconView: React.FC<LexiconViewProps> = ({ translations }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = useMemo(() => {
    if (!searchTerm) {
      return ALL_LEXICON_ENTRIES;
    }
    return ALL_LEXICON_ENTRIES.filter(entry =>
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => a.term.localeCompare(b.term));
  }, [searchTerm]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-endocrine-primary dark:text-blue-300">{translations.lexiconTitle}</h2>
      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder={translations.searchTerm}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-endocrine-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-endocrine-dark-surface dark:text-gray-200"
        />
      </div>
      {filteredEntries.length > 0 ? (
        <ul className="space-y-4 max-w-xl mx-auto">
          {filteredEntries.map(entry => (
            <li key={entry.id} className="p-6 bg-endocrine-light-surface dark:bg-endocrine-dark-surface rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-endocrine-secondary dark:text-green-400 mb-1">
                {entry.emoji && <span className="mr-2">{entry.emoji}</span>}{entry.term}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{entry.definition}</p>
              {entry.synonyms && entry.synonyms.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400"><em>Synonymes: {entry.synonyms.join(', ')}</em></p>
              )}
              {entry.etymology && (
                <p className="text-sm text-gray-500 dark:text-gray-400"><em>Étymologie: {entry.etymology}</em></p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">{translations.noResults}</p>
      )}
    </div>
  );
};

export default LexiconView;
    