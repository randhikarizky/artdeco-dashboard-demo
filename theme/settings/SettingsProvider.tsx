'use client';

import type { ColorType } from '../core/palette';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

// ----------------------------------------------------------------------

export type ThemeMode = 'light' | 'dark';

type SettingsContextValue = {
  mode: ThemeMode;
  primaryColor: ColorType;
  drawerOpen: boolean;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePrimaryColor: (color: ColorType) => void;
  onToggleDrawer: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ThemeMode>('light');
  const [primaryColor, setPrimaryColor] = useState<ColorType>('cyan');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load settings from localStorage only after mount (client-side only)
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    const savedColor = localStorage.getItem('theme-primary-color') as ColorType | null;

    if (savedMode) {
      setMode(savedMode);
    }
    // Validate saved color is a valid ColorType
    const validColors: ColorType[] = ['cyan', 'rose500', 'lime500', 'fuchsia600', 'red600', 'teal600', 'orange600'];
    if (savedColor && validColors.includes(savedColor)) {
      setPrimaryColor(savedColor);
    } else if (savedColor) {
      // Clear invalid old value from localStorage
      localStorage.removeItem('theme-primary-color');
    }
  }, []);

  const onChangeMode = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  }, []);

  const onChangePrimaryColor = useCallback((color: ColorType) => {
    setPrimaryColor(color);
    localStorage.setItem('theme-primary-color', color);
  }, []);

  const onToggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      primaryColor,
      drawerOpen,
      onChangeMode,
      onChangePrimaryColor,
      onToggleDrawer,
    }),
    [mode, primaryColor, drawerOpen, onChangeMode, onChangePrimaryColor, onToggleDrawer]
  );

  // Prevent flash of unstyled content by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// ----------------------------------------------------------------------

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}
