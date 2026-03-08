import type { Theme } from '@mui/material/styles';

import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface CustomShadows {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  //
  card: string;
  dropdown: string;
  dialog: string;
  //
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
}

// ----------------------------------------------------------------------

function createShadowColor(color: string) {
  return `0 8px 16px 0 ${alpha(color, 0.24)}`;
}

export function customShadows(theme: Theme): CustomShadows {
  const baseColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[500]
      : theme.palette.common.black;

  const transparent = alpha(baseColor, 0.16);

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    card: `0 0 2px 0 ${alpha(baseColor, 0.2)}, 0 12px 24px -4px ${alpha(baseColor, 0.12)}`,
    dropdown: `0 0 2px 0 ${alpha(baseColor, 0.24)}, -20px 20px 40px -4px ${alpha(baseColor, 0.24)}`,
    dialog: `-40px 40px 80px -8px ${alpha(theme.palette.common.black, 0.24)}`,
    //
    primary: createShadowColor(theme.palette.primary.main),
    secondary: createShadowColor(theme.palette.secondary.main),
    info: createShadowColor(theme.palette.info.main),
    success: createShadowColor(theme.palette.success.main),
    warning: createShadowColor(theme.palette.warning.main),
    error: createShadowColor(theme.palette.error.main),
  };
}
