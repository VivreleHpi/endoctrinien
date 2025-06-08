
import React, { ReactNode } from 'react';
import { XMarkIcon } from './IconComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out animate-fadeIn">
      <div className="bg-endocrine-light-surface dark:bg-endocrine-dark-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-slideInUp">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-endocrine-primary dark:text-blue-400">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
    