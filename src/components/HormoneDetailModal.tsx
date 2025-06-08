import React from 'react';
import { Hormone } from '../types';
import Modal from './Modal';

interface HormoneDetailModalProps {
  hormone: Hormone | null;
  isOpen: boolean;
  onClose: () => void;
  translations: {
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
  }
}

const HormoneDetailModal: React.FC<HormoneDetailModalProps> = ({ hormone, isOpen, onClose, translations }) => {
  if (!hormone) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${hormone.emoji} ${translations.hormoneInfoTitle}: ${hormone.nom}`}>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">{translations.gland}</h4>
              <p className="text-blue-700 dark:text-blue-400">{hormone.glande_nom}</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">{translations.type}</h4>
              <p className="text-blue-700 dark:text-blue-400">{hormone.type}</p>
            </div>
          </div>
        </div>

        {/* Main Function */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
            🎯 {translations.mainFunction}
          </h4>
          <p className="text-green-700 dark:text-green-400 leading-relaxed">{hormone.fonction}</p>
        </div>

        {/* Target Organs */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
            🎯 {translations.targetOrgans}
          </h4>
          <div className="flex flex-wrap gap-2">
            {hormone.organes_cibles.map((organ, index) => (
              <span key={index} className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                {organ}
              </span>
            ))}
          </div>
        </div>

        {/* Normal Values */}
        {hormone.valeurs_normales && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
              📊 {translations.normalValues}
            </h4>
            <p className="text-amber-700 dark:text-amber-400">{hormone.valeurs_normales}</p>
          </div>
        )}

        {/* Circadian Rhythm */}
        {hormone.rythme_circadien && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
              🕐 Rythme Circadien
            </h4>
            <p className="text-indigo-700 dark:text-indigo-400">{hormone.rythme_circadien}</p>
          </div>
        )}

        {/* Pathologies */}
        {hormone.pathologies_details && hormone.pathologies_details.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700">
            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              ⚠️ {translations.pathologiesSectionTitle}
            </h4>
            <div className="space-y-4">
              {hormone.pathologies_details.map((pathology, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-100 dark:border-red-800">
                  <h5 className="font-bold text-red-700 dark:text-red-400 mb-2">{pathology.name}</h5>
                  {pathology.description && (
                    <p className="text-red-600 dark:text-red-400 mb-3 text-sm">{pathology.description}</p>
                  )}
                  
                  {pathology.symptoms && pathology.symptoms.length > 0 && (
                    <div className="mb-3">
                      <h6 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">
                        🔍 {translations.symptoms}
                      </h6>
                      <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1">
                        {pathology.symptoms.map((symptom, idx) => (
                          <li key={idx}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {pathology.care_info && (
                    <div className="mb-3">
                      <h6 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">
                        💊 {translations.careAndTreatment}
                      </h6>
                      <p className="text-sm text-red-600 dark:text-red-400">{pathology.care_info}</p>
                    </div>
                  )}
                  
                  {pathology.prevention_info && (
                    <div>
                      <h6 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">
                        🛡️ {translations.prevention}
                      </h6>
                      <p className="text-sm text-red-600 dark:text-red-400">{pathology.prevention_info}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h4 className="font-semibold text-cyan-800 dark:text-cyan-300 mb-1">
                Note Éducative
              </h4>
              <p className="text-sm text-cyan-700 dark:text-cyan-400">
                Cette information est fournie à des fins éducatives uniquement. 
                Consultez toujours un professionnel de santé pour des conseils médicaux personnalisés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HormoneDetailModal;