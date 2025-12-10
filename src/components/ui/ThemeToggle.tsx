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
      <ToggleButton value='light'>
        <LightMode fontSize='small' />
      </ToggleButton>
      <ToggleButton value='system'>
        <BrightnessAuto fontSize='small' />
      </ToggleButton>
      <ToggleButton value='dark'>
        <DarkMode fontSize='small' />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
