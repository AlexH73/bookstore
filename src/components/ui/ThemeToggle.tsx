import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { LightMode, DarkMode, BrightnessAuto } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTheme, type ThemeMode } from '../../features/theme/themeSlice';

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={mode}
      onChange={(_, newValue) => {
        if (newValue !== null) {
          dispatch(setTheme(newValue as ThemeMode));
        }
      }}
    >
      <ToggleButton value='light' className='dark:bg-gray-400!'>
        <LightMode fontSize='small' className='text-orange-400' />
      </ToggleButton>
      <ToggleButton value='system' className='dark:bg-gray-400!'>
        <BrightnessAuto fontSize='small' className='text-gray-500' />
      </ToggleButton>
      <ToggleButton value='dark' className='dark:bg-gray-400!'>
        <DarkMode
          fontSize='small'
          className='text-amber-300'
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
