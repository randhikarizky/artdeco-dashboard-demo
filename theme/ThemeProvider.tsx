'use client';

import type { ColorType } from './core/palette';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { getLightPalette, getDarkPalette } from './core/palette';
import { shadows } from './core/shadows';
import { typography } from './core/typography';
import { shape } from './core/shape';
import { customShadows } from './core/custom-shadows';
import { components } from './overrides';
import { useSettings } from './settings/SettingsProvider';

// ----------------------------------------------------------------------

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const settings = useSettings();

  const theme = React.useMemo(() => {
    const palette = settings.mode === 'light' 
      ? getLightPalette(settings.primaryColor)
      : getDarkPalette(settings.primaryColor);
    
    // Create base theme with palette first
    const baseTheme = createTheme({
      palette,
      typography: {
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    });

    // Then extend with full typography, shadows and components
    return createTheme(baseTheme, {
      typography: typography(baseTheme),
      shadows: shadows(baseTheme),
      customShadows: customShadows(baseTheme),
      shape,
      components,
    });
  }, [settings.primaryColor, settings.mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
