import { ApexOptions } from "apexcharts";
import { Box, Stack, Divider, CardHeader, Card, CardProps, useTheme, Typography } from "@mui/material";
import { Chart } from "./Chart";
import { useChart } from "@/hooks/useChart";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

export default function ActiveAreasChart({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  // Find most active area
  const mostActiveArea = series.reduce((prev, current) => 
    (current.value > prev.value) ? current : prev
  );

  // Calculate total reports
  const totalReports = series.reduce((sum, item) => sum + item.value, 0);

  const chartOptions = useChart({
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: {
      opacity: 0.8,
    },
    legend: {
      position: "right",
      itemMargin: {
        horizontal: 10,
        vertical: 7,
      },
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      theme: theme.palette.mode,
      y: {
        formatter: (val: number) => `${val} laporan`,
      },
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
          strokeColor: theme.palette.divider,
        },
        spokes: {
          strokeWidth: 1,
          connectorColors: theme.palette.divider,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: "12px",
        },
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: "bottom",
            horizontalAlign: "left",
            labels: {
              colors: theme.palette.text.primary,
            },
          },
        },
      },
    ],
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          my: 5,
          "& .apexcharts-legend": {
            m: "auto",
            height: { sm: 160 },
            flexWrap: { sm: "wrap" },
            width: { xs: 240, sm: "50%" },
          },
          "& .apexcharts-datalabels-group": {
            display: "none",
          },
        }}
      >
        <Chart
          dir="ltr"
          type="polarArea"
          series={chartSeries}
          options={chartOptions}
          width="100%"
          height={240}
        />
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ textAlign: "center" }}
      >
        <Stack sx={{ py: 2, borderRight: `dashed 1px ${theme.palette.divider}` }}>
          <Box component="span" sx={{ mb: 1, typography: "body2", color: "text.secondary" }}>
            Area Paling Aktif
          </Box>
          <Typography variant="h4" sx={{ color: "text.primary", fontWeight: 700 }}>
            {mostActiveArea.label}
          </Typography>
        </Stack>

        <Stack sx={{ py: 2 }}>
          <Box component="span" sx={{ mb: 1, typography: "body2", color: "text.secondary" }}>
            Total Laporan
          </Box>
          <Typography variant="h4" sx={{ color: "text.primary", fontWeight: 700 }}>
            {totalReports.toLocaleString("id-ID")}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
