import {Props} from "react-apexcharts";
import {useTheme} from "@mui/material/styles";

export default function chartStyles(options?: Props['options']) {
  const theme = useTheme();
  
  const RESPONSIVE = [
    {
      breakpoint: theme.breakpoints.values.sm,
      options: {
        legend: {show: true},
        plotOptions: {
          bar: {
            borderRadius: 15,
            columnWidth: '65%',
            borderRadiusApplication: 'end',
            dataLabels: {
              orientation: 'horizontal',
              position: 'top'
            }
          },
        },
      },
    },
    {
      breakpoint: theme.breakpoints.values.md,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 15,
            columnWidth: '60%',
            borderRadiusApplication: 'end'
          },
        },
      },
    },
    ...(options?.responsive ?? []),
  ];
  
  const chartOptions: Props['options'] = {
    ...options,
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.vars.palette.text.disabled,
      ...options?.chart,
      animations: {
        enabled: true,
        speed: 360,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 360 },
        ...options?.chart?.animations,
      },
    },
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker,
    ],
    states: {
      ...options?.states,
      hover: {
        ...options?.states?.hover,
        filter: { type: 'darken', value: 0.88, ...options?.states?.hover?.filter },
      },
      active: {
        ...options?.states?.active,
        filter: { type: 'darken', value: 0.88, ...options?.states?.active?.filter },
      },
    },
    fill: {
      opacity: 1,
      ...options?.fill,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        ...options?.fill?.gradient,
      },
    },
    dataLabels: {
      ...options?.dataLabels,
    },
    stroke: {
      width: 2.5,
      curve: 'smooth',
      lineCap: 'round',
      ...options?.stroke,
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.vars.palette.divider,
      ...options?.grid,
      padding: {
        ...options?.grid?.padding,
      },
      xaxis: {
        lines: {
          show: true,
        },
        ...options?.grid?.xaxis,
      },
    },
    xaxis: {
      labels: {
        style: {
          fontWeight: 700,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      ...options?.xaxis,
    },
    yaxis: {
      show: false,
      tickAmount: 5,
      ...options?.yaxis,
    },
    markers: {
      size: 0,
      strokeColors: theme.vars.palette.background.paper,
      ...options?.markers,
    },
    tooltip: {
      theme: 'false',
      fillSeriesColor: true,
      x: {
        show: false,
      },
      ...options?.tooltip,
    },
    plotOptions: {
      bar: {
        borderRadius: 15,
        columnWidth: '65%',
        borderRadiusApplication: 'end'
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      showForZeroSeries: true,
      showForNullSeries: true,
      position: 'top',
      fontWeight: 500,
      fontSize: '13px',
      horizontalAlign: 'left',
      ...options?.legend,
      labels: {
        colors: theme.vars.palette.text.primary,
        useSeriesColors: true,
        ...options?.legend?.labels,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 8,
        ...options?.legend?.itemMargin,
      },
    },
    responsive: RESPONSIVE.reduce((acc: typeof RESPONSIVE, cur) => {
      if (!acc.some((item) => item.breakpoint === cur.breakpoint)) {
        acc.push(cur);
      }
      return acc;
    }, []),
  }
  
  return chartOptions
}