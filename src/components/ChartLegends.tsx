'use client';

import { Stack, StackProps, Box, Typography } from '@mui/material';

interface ChartLegendsProps extends StackProps {
  labels: string[];
  colors: string[];
}

export function ChartLegends({ labels, colors, ...other }: ChartLegendsProps) {
  return (
    <Stack direction="row" flexWrap="wrap" {...other}>
      {labels.map((label, index) => (
        <Stack key={label} direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: colors[index],
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
