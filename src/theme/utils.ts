// ----------------------------------------------------------------------

export const stylesMode = {
  light: '[data-mui-color-scheme="light"] &',
  dark: '[data-mui-color-scheme="dark"] &',
};

export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
};

/**
 * Set font family
 */
export function setFont(fontName: string) {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`;
}

/**
 * Converts px to rem
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

/**
 * Responsive font sizes
 */
export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  };
}

/**
 * Converts a hex color to RGB channels
 */
export function hexToRgbChannel(hex: string) {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
}

/**
 * Converts a hex color to RGB channels
 */
export function createPaletteChannel(hexPalette: Record<string, string>) {
  const channelPalette: Record<string, string> = {};

  Object.entries(hexPalette).forEach(([key, value]) => {
    channelPalette[`${key}Channel`] = hexToRgbChannel(value);
  });

  return { ...hexPalette, ...channelPalette };
}

/**
 * Color with alpha channel
 */
export function varAlpha(color: string, opacity = 1) {
  return `rgba(${color.replace(/var\((.*?)\)/, '$1')} / ${opacity})`;
}
