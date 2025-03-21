import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      aria-label={`Change language to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className="sr-only">Change language to {language === 'en' ? 'Spanish' : 'English'}</span>
      <span className="font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}

export default LanguageToggle;