import { Stack, StackProps, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Icon from "./Icon";

// ----------------------------------------------------------------------

type ColorSchema = "primary" | "secondary" | "info" | "success" | "warning" | "error";

interface AppWidgetProps extends StackProps {
  icon: string;
  title: string;
  total: number | string;
  color?: ColorSchema;
  subtitle?: string;
  trend?: number;
  trendUp?: boolean;
}

export default function AppWidget({
  title,
  total,
  icon,
  color = "primary",
  subtitle,
  trend,
  trendUp,
  sx,
  ...other
}: AppWidgetProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        color: "common.white",
        bgcolor: `${color}.dark`,
        flexGrow: 1,
        width: "100%",
        height: "100%",
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255, 255, 255, 0.16)",
          flexShrink: 0,
        }}
      >
        <Icon icon={icon} width={32} color={theme.palette.common.white} />
      </Box>

      <Box sx={{ ml: 3, flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: "inherit",
              fontWeight: 700,
            }}
          >
            {total}
          </Typography>
          {trend !== undefined && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.16)",
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Icon
                icon={trendUp ? "eva:trending-up-fill" : "eva:trending-down-fill"}
                width={16}
                color={theme.palette.common.white}
              />
              <Typography variant="caption" sx={{ color: "inherit", fontWeight: 600 }}>
                {Math.abs(trend)}%
              </Typography>
            </Stack>
          )}
        </Stack>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            color: "inherit",
            opacity: 0.8,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              color: "inherit",
              opacity: 0.64,
              mt: 0.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Icon
        icon={icon}
        width={112}
        sx={{
          position: "absolute",
          right: -32,
          opacity: 0.08,
        }}
      />
    </Stack>
  );
}
