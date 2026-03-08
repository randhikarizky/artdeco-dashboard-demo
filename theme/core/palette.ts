import type { PaletteOptions } from '@mui/material/styles';

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// ----------------------------------------------------------------------

const grey = {
  50: '#FCFDFD',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#1C252E',
  900: '#141A21',
};

const colorSchemes = {
  // Primary color options
  cyan: {
    lighter: '#CCF4FA',
    light: '#66E0F0',
    main: '#00b8d9',
    dark: '#0097B3',
    darker: '#006C85',
    contrastText: '#FFFFFF',
  },
  rose500: {
    lighter: '#FFE4E6',
    light: '#FDA4AF',
    main: '#F43F5E',
    dark: '#E11D48',
    darker: '#BE123C',
    contrastText: '#FFFFFF',
  },
  lime500: {
    lighter: '#ECFCCB',
    light: '#BEF264',
    main: '#84CC16',
    dark: '#65A30D',
    darker: '#4D7C0F',
    contrastText: '#000000',
  },
  fuchsia600: {
    lighter: '#F5D0FE',
    light: '#E879F9',
    main: '#C026D3',
    dark: '#A21CAF',
    darker: '#86198F',
    contrastText: '#FFFFFF',
  },
  red600: {
    lighter: '#FEE2E2',
    light: '#F87171',
    main: '#DC2626',
    dark: '#B91C1C',
    darker: '#991B1B',
    contrastText: '#FFFFFF',
  },
  teal600: {
    lighter: '#CCFBF1',
    light: '#5EEAD4',
    main: '#0EA5A4',
    dark: '#0F766E',
    darker: '#115E59',
    contrastText: '#FFFFFF',
  },
  orange600: {
    lighter: '#FFEDD5',
    light: '#FDBA74',
    main: '#F97316',
    dark: '#EA580C',
    darker: '#C2410C',
    contrastText: '#FFFFFF',
  },
  // Default theme colors (secondary, info, success, warning, error)
  secondary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#D9DDFF',
    light: '#8D99FF',
    main: '#4252FF',
    dark: '#212BB7',
    darker: '#0C127A',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff',
  },
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  },
};

export type ColorType = 'cyan' | 'rose500' | 'lime500' | 'fuchsia600' | 'red600' | 'teal600' | 'orange600';

// ----------------------------------------------------------------------

export function getLightPalette(primaryColor: ColorType = 'cyan'): PaletteOptions {
  // Ensure primaryColor is valid, fallback to cyan if not
  const validColor = colorSchemes[primaryColor] ? primaryColor : 'cyan';
  
  return {
    mode: 'light',
    primary: colorSchemes[validColor],
    secondary: colorSchemes.secondary,
    info: colorSchemes.info,
    success: colorSchemes.success,
    warning: colorSchemes.warning,
    error: colorSchemes.error,
    grey,
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: grey[200],
    },
    divider: grey[300],
    action: {
      active: grey[600],
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(145, 158, 171, 0.16)',
      disabled: 'rgba(145, 158, 171, 0.8)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      focus: 'rgba(145, 158, 171, 0.24)',
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
}

export function getDarkPalette(primaryColor: ColorType = 'cyan'): PaletteOptions {
  // Ensure primaryColor is valid, fallback to cyan if not
  const validColor = colorSchemes[primaryColor] ? primaryColor : 'cyan';
  
  return {
    mode: 'dark',
    primary: colorSchemes[validColor],
    secondary: colorSchemes.secondary,
    info: colorSchemes.info,
    success: colorSchemes.success,
    warning: colorSchemes.warning,
    error: colorSchemes.error,
    grey,
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: '#28323D',
    },
    divider: grey[700],
    action: {
      active: grey[500],
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(145, 158, 171, 0.16)',
      disabled: 'rgba(145, 158, 171, 0.8)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      focus: 'rgba(145, 158, 171, 0.24)',
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
}
