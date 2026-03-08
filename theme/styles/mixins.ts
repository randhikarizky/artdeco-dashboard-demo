import type { Theme, CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

// Helper for applying styles based on theme mode
export const stylesModeSelectors = {
  light: '[data-mui-color-scheme="light"] &',
  dark: '[data-mui-color-scheme="dark"] &',
};

export function stylesMode(theme: Theme, light: CSSObject, dark: CSSObject): CSSObject {
  return {
    ...light,
    ...theme.applyStyles('dark', dark),
  };
}
