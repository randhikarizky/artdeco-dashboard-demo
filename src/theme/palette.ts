import type { PaletteOptions } from '@mui/material/styles';

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

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    lighter: '#CCF4FA',
    light: '#66E0F0',
    main: '#00b8d9',
    dark: '#0097B3',
    darker: '#006C85',
    contrastText: '#FFFFFF',
  },
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
  grey,
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: '#919EAB',
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

