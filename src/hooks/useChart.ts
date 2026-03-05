import { useTheme } from "@mui/material/styles";

export interface ChartOptions {
  chart?: any;
  colors?: string[];
  states?: any;
  fill?: any;
  dataLabels?: any;
  stroke?: any;
  grid?: any;
  xaxis?: any;
  yaxis?: any;
  markers?: any;
  tooltip?: any;
  legend?: any;
  plotOptions?: any;
  responsive?: any[];
}

export function useChart(options?: ChartOptions): ChartOptions {
  const theme = useTheme();

  return {
    ...options,
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.text.disabled,
      ...options?.chart,
    },
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
    ],
    dataLabels: {
      enabled: false,
      ...options?.dataLabels,
    },
    stroke: {
      width: 2.5,
      curve: "smooth",
      lineCap: "round",
      ...options?.stroke,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      ...options?.grid,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      ...options?.xaxis,
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
      ...options?.markers,
    },
    tooltip: {
      theme: 'light',
      x: { show: true },
      ...options?.tooltip,
    },
    legend: {
      show: true,
      fontSize: '13px',
      position: 'top',
      horizontalAlign: 'right',
      markers: { radius: 12 },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: { colors: theme.palette.text.primary },
      ...options?.legend,
    },
  };
}
