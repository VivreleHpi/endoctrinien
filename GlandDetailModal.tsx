
import React from 'react';
import { Gland, Hormone } from '../types';
import { ALL_HORMONES } from '../constants';
import Modal from './Modal';

interface GlandDetailModalProps {
  gland: Gland | null;
  isOpen: boolean;
  onClose: () => void;
  onHormoneSelect: (hormone: Hormone) => void;
  translations: {
    glandDetailsTitle: string;
    hormonesProduced: string;
  }
}

const GlandDetailModal: React.FC<GlandDetailModalProps> = ({ gland, isOpen, onClose, onHormoneSelect, translations }) => {
  if (!gland) return null;

  const hormones = ALL_HORMONES.filter(h => gland.hormone_ids.includes(h.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${gland.emoji} ${translations.glandDetailsTitle}: ${gland.name}`}>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{gland.description}</p>
      
      <h3 className="text-xl font-semibold mb-2 text-endocrine-secondary dark:text-green-400">{translations.hormonesProduced}</h3>
      {hormones.length > 0 ? (
        <ul className="space-y-2">
          {hormones.map(hormone => (
            <li key={hormone.id}>
              <button
                onClick={() => onHormoneSelect(hormone)}
                className="w-full text-left p-3 rounded-md bg-endocrine-light-bg dark:bg-endocrine-dark-bg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
              >
                <span className="font-medium text-endocrine-primary dark:text-blue-400">{hormone.emoji} {hormone.nom}</span> - <span className="text-sm text-gray-600 dark:text-gray-400">{hormone.fonction.substring(0, 80)}...</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Aucune hormone principale listée pour cette glande.</p>
      )}
    </Modal>
  );
};

export default GlandDetailModal;
    