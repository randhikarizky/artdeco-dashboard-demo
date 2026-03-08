import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';

// Simple scrollbar component
export const Scrollbar = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: (theme) =>
            `${theme.palette.divider} transparent`,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.divider,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: (theme) => theme.palette.text.disabled,
          },
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
    );
  }
);

Scrollbar.displayName = 'Scrollbar';
