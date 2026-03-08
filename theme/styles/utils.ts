// ----------------------------------------------------------------------

export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
};

// Paper effect
export function paper({ theme, bgcolor, dropdown }: any) {
  return {
    backgroundColor: bgcolor || theme.palette.background.paper,
    ...(theme.palette.mode === 'light'
      ? { boxShadow: theme.customShadows.dropdown }
      : { boxShadow: dropdown ? theme.customShadows.dropdown : theme.customShadows.z8 }),
  };
}

// Menu item styles
export function menuItem(theme: any) {
  return {
    ...theme.typography.body2,
    padding: theme.spacing(0.75, 1),
    borderRadius: Number(theme.shape.borderRadius) * 0.75,
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
    },
  };
}

/**
 * Set font family
 */
export function setFont(fontName: string) {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`;
}

/**
 * Converts rem to px
 */
export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
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
  // If color is already in RGB channel format (e.g., "255 0 0"), use it directly  
  if (/^\d+\s+\d+\s+\d+$/.test(color)) {
    return `rgba(${color} / ${opacity})`;
  }
  
  // If color is a hex color, convert it to RGB channel format
  if (color.startsWith('#')) {
    const channel = hexToRgbChannel(color);
    return `rgba(${channel} / ${opacity})`;
  }
  
  // Fallback: use alpha() from MUI for other color formats
  return color.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`);
}

/**
 * Background gradient helper
 */
export function bgGradient(props: {
  color?: string;
  imgUrl?: string;
  direction?: string;
}) {
  const { color, imgUrl, direction = 'to bottom' } = props;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${color || 'transparent'}, ${color || 'transparent'}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${color}, ${color})`,
  };
}

/**
 * Background blur helper
 */
export function bgBlur(props: {
  color?: string;
  blur?: number;
  imgUrl?: string;
}) {
  const { color, blur = 6, imgUrl } = props;

  if (imgUrl) {
    return {
      position: 'relative' as const,
      backgroundImage: `url(${imgUrl})`,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
  };
}
