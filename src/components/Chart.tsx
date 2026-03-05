'use client';

import dynamic from "next/dynamic";
import { Box, BoxProps, Skeleton } from "@mui/material";

const ApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height="100%" />
});

interface ChartProps extends BoxProps {
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'radar' | 'polarArea';
  series: any[];
  options: any;
  height?: number | string;
  width?: string | number;
}

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  width = "100%",
  ...other
}: ChartProps) {
  return (
    <Box
      dir="ltr"
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: "relative",
        ...sx,
      }}
      {...other}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width="100%"
        height="100%"
      />
    </Box>
  );
}
