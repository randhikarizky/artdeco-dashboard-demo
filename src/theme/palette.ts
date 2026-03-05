import type { ColorSystemOptions } from '@mui/material/styles';
import { createPaletteChannel } from './utils';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    whiteChannel: string;
    blackChannel: string;
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

const mainColors = {
  primary: {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#00B8D9",
    dark: "#006C9C",
    darker: "#003768",
    contrastText: "#FFFFFF"
  },
  secondary: {
    lighter: "#EFD6FF",
    light: "#C684FF",
    main: "#8E33FF",
    dark: "#5119B7",
    darker: "#27097A",
    contrastText: "#FFFFFF"
  },
  info: {
    lighter: "#D9DDFF",
    light: "#8D99FF",
    main: "#4252FF",
    dark: "#212BB7",
    darker: "#0C127A",
    contrastText: "#FFFFFF"
  },
  success: {
    lighter: "#D3FCD2",
    light: "#77ED8B",
    main: "#22C55E",
    dark: "#118D57",
    darker: "#065E49",
    contrastText: "#ffffff"
  },
  warning: {
    lighter: "#FFF5CC",
    light: "#FFD666",
    main: "#FFAB00",
    dark: "#B76E00",
    darker: "#7A4100",
    contrastText: "#1C252E"
  },
  error: {
    lighter: "#FFE9D5",
    light: "#FFAC82",
    main: "#FF5630",
    dark: "#B71D18",
    darker: "#7A0916",
    contrastText: "#FFFFFF"
  },
  grey: {
    50: "#FCFDFD",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#1C252E",
    900: "#141A21"
  },
  common: {
    black: "#000000",
    white: "#FFFFFF"
  }
}

export const grey = createPaletteChannel(mainColors.grey);
export const primary = createPaletteChannel(mainColors.primary);
export const secondary = createPaletteChannel(mainColors.secondary);
export const info = createPaletteChannel(mainColors.info);
export const success = createPaletteChannel(mainColors.success);
export const warning = createPaletteChannel(mainColors.warning);
export const error = createPaletteChannel(mainColors.error);
export const common = createPaletteChannel(mainColors.common);
