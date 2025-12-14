import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { type Language } from '../../features/language/languageSlice';

interface LanguageToggleProps {
  currentLanguage: Language;
  handleLanguageChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  handleLanguageChange,
}) => {
  return (
    <ToggleButtonGroup
      color='primary'
      value={currentLanguage}
      exclusive
      onChange={(_, newLang) => {
        if (newLang !== null) handleLanguageChange(newLang as Language);
      }}
      aria-label='Language switcher'
    >
      <ToggleButton className='py-1! px-2! text-s!' value='en'>
        EN
      </ToggleButton>
      <ToggleButton className='py-1! px-2! text-s!' value='de'>
        DE
      </ToggleButton>
      <ToggleButton className='py-1! px-2! text-s!' value='ru'>
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggle;
