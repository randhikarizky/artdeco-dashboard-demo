import type { ColorSystemOptions } from '@mui/material/styles';

import { varAlpha, createPaletteChannel } from '../styles';

// ----------------------------------------------------------------------

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    whiteChannel: string;
    blackChannel: string;
  }
  interface TypeText {
    disabledChannel: string;
    inverted: string;
  }
  interface TypeBackground {
    neutral: string;
    neutralChannel: string;
    inverted: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    lighterChannel: string;
    darkerChannel: string;
  }
}

declare module '@mui/material/styles' {
  interface ThemeVars {
    transitions: Theme['transitions'];
  }
}

declare module '@mui/material' {
  interface Color {
    ['50Channel']: string;
    ['100Channel']: string;
    ['200Channel']: string;
    ['300Channel']: string;
    ['400Channel']: string;
    ['500Channel']: string;
    ['600Channel']: string;
    ['700Channel']: string;
    ['800Channel']: string;
    ['900Channel']: string;
  }
}

const mainColors = {
  "primary": {
    "lighter": "#CAFDF5",
    "light": "#61F3F3",
    "main": "#00B8D9",
    "dark": "#006C9C",
    "darker": "#003768",
    "contrastText": "#FFFFFF"
  },
  "secondary": {
    "lighter": "#EFD6FF",
    "light": "#C684FF",
    "main": "#8E33FF",
    "dark": "#5119B7",
    "darker": "#27097A",
    "contrastText": "#FFFFFF"
  },
  "info": {
    "lighter": "#D9DDFF",
    "light": "#8D99FF",
    "main": "#4252FF",
    "dark": "#212BB7",
    "darker": "#0C127A",
    "contrastText": "#FFFFFF"
  },
  "success": {
    "lighter": "#D3FCD2",
    "light": "#77ED8B",
    "main": "#22C55E",
    "dark": "#118D57",
    "darker": "#065E49",
    "contrastText": "#ffffff"
  },
  "warning": {
    "lighter": "#FFF5CC",
    "light": "#FFD666",
    "main": "#FFAB00",
    "dark": "#B76E00",
    "darker": "#7A4100",
    "contrastText": "#1C252E"
  },
  "error": {
    "lighter": "#FFE9D5",
    "light": "#FFAC82",
    "main": "#FF5630",
    "dark": "#B71D18",
    "darker": "#7A0916",
    "contrastText": "#FFFFFF"
  },
  "grey": {
    "50": "#FCFDFD",
    "100": "#F9FAFB",
    "200": "#F4F6F8",
    "300": "#DFE3E8",
    "400": "#C4CDD5",
    "500": "#919EAB",
    "600": "#637381",
    "700": "#454F5B",
    "800": "#1C252E",
    "900": "#141A21"
  },
  "common": {
    "black": "#000000",
    "white": "#FFFFFF"
  }
}

export type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// ----------------------------------------------------------------------

// Grey
export const grey = createPaletteChannel(mainColors.grey);

// Primary
export const primary = createPaletteChannel(mainColors.primary);

// Secondary
export const secondary = createPaletteChannel(mainColors.secondary);

// Info
export const info = createPaletteChannel(mainColors.primary);

// Success
export const success = createPaletteChannel(mainColors.success);

// Warning
export const warning = createPaletteChannel(mainColors.warning);

// Error
export const error = createPaletteChannel(mainColors.error);

// Common
export const common = createPaletteChannel(mainColors.common);

// Text
export const text = {
  light: createPaletteChannel({ primary: grey[800], secondary: grey[600], disabled: grey[500], inverted: '#FFFFFF' }),
  dark: createPaletteChannel({ primary: '#FFFFFF', secondary: grey[500], disabled: grey[600], inverted: grey[800] }),
};

// Background
export const background = {
  light: createPaletteChannel({ paper: '#FFFFFF', default: '#FFFFFF', neutral: grey[200], inverted: grey[800] }),
  dark: createPaletteChannel({ paper: grey[800], default: grey[900], neutral: '#28323D', inverted: grey[300] }),
};

// Action
export const baseAction = {
  hover: varAlpha(grey['500Channel'], 0.08),
  selected: varAlpha(grey['500Channel'], 0.16),
  focus: varAlpha(grey['500Channel'], 0.24),
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const action = {
  light: { ...baseAction, active: grey[600] },
  dark: { ...baseAction, active: grey[500] },
};

/*
 * Base palette
 */
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: varAlpha(grey['500Channel'], 0.2),
  action,
};

export const lightPalette = {
  ...basePalette,
  text: text.light,
  background: background.light,
  action: action.light,
};

export const darkPalette = {
  ...basePalette,
  text: text.dark,
  background: background.dark,
  action: action.dark,
};

// ----------------------------------------------------------------------

export const colorSchemes: Partial<Record<'dark' | 'light', ColorSystemOptions>> = {
  light: { palette: lightPalette },
  dark: { palette: darkPalette },
};
