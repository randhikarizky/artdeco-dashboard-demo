'use client';

import type { ColorType } from '../../../theme/core/palette';

import {
  Box,
  Stack,
  Badge,
  Drawer,
  Tooltip,
  IconButton,
  Typography,
  Switch,
  Select,
  MenuItem,
  FormControl,
  drawerClasses,
  ButtonBase,
  ButtonBaseProps,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Icon from '@/components/Icon';
import { useSettings } from '../../../theme/settings/SettingsProvider';
import { varAlpha } from '../../../theme/styles/utils';

// ----------------------------------------------------------------------

const COLOR_OPTIONS: { value: ColorType; label: string }[] = [
  { value: 'cyan', label: 'Default Cyan' },
  { value: 'rose500', label: 'Hot Rose' },
  { value: 'lime500', label: 'Chartreuse' },
  { value: 'fuchsia600', label: 'Magenta Orchid' },
  { value: 'red600', label: 'Vermilion Red' },
  { value: 'teal600', label: 'Teal Jade' },
  { value: 'orange600', label: 'Burnt Tangerine' },
];

// ----------------------------------------------------------------------

type BaseOptionProps = ButtonBaseProps & {
  icon: string;
  label: string;
  selected: boolean;
  tooltip?: string;
};

function BaseOption({ icon, label, tooltip, selected, ...other }: BaseOptionProps) {
  return (
    <ButtonBase
      disableRipple
      sx={{
        px: 2,
        py: 2.5,
        borderRadius: 2,
        cursor: 'pointer',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        },
        ...(selected && {
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        }),
      }}
      {...other}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: 1, mb: 3 }}>
        <Icon icon={icon} width={24} />
        <Switch name={label} size="small" color="default" checked={selected} sx={{ mr: -0.75 }} />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
        <Box
          component="span"
          sx={{
            lineHeight: '18px',
            fontWeight: 600,
            fontSize: (theme) => theme.typography.pxToRem(13),
          }}
        >
          {label}
        </Box>

        {tooltip && (
          <Tooltip
            arrow
            title={tooltip}
            slotProps={{
              tooltip: { sx: { maxWidth: 240, mr: 0.5 } },
            }}
          >
            <Icon
              width={16}
              icon="solar:info-circle-linear"
              sx={{ cursor: 'pointer', color: 'text.disabled' }}
            />
          </Tooltip>
        )}
      </Box>
    </ButtonBase>
  );
}

// ----------------------------------------------------------------------

// Get color preview from theme
function getColorPreview(primaryColor: ColorType) {
  const colorMap: Record<ColorType, string> = {
    cyan: '#00b8d9',
    rose500: '#F43F5E',
    lime500: '#84CC16',
    fuchsia600: '#C026D3',
    red600: '#DC2626',
    teal600: '#0EA5A4',
    orange600: '#F97316',
  };
  return colorMap[primaryColor];
}

export function SettingsDrawer() {
  const theme = useTheme();
  const settings = useSettings();

  const isDarkMode = settings.mode === 'dark';
  const hasChanges = settings.mode !== 'light' || settings.primaryColor !== 'cyan';

  const handleModeChange = () => {
    settings.onChangeMode(isDarkMode ? 'light' : 'dark');
  };

  const handleColorChange = (event: any) => {
    settings.onChangePrimaryColor(event.target.value as ColorType);
  };

  const handleReset = () => {
    settings.onChangeMode('light');
    settings.onChangePrimaryColor('cyan');
  };

  const renderHead = (
    <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!hasChanges}>
            <Icon icon="solar:restart-bold" width={20} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton onClick={settings.onToggleDrawer}>
          <Icon icon="solar:close-circle-linear" width={20} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = (
    <BaseOption
      label="Dark mode"
      icon="solar:moon-bold-duotone"
      selected={isDarkMode}
      onClick={handleModeChange}
    />
  );

  const renderColorPicker = (
    <FormControl fullWidth>
      <Typography variant="subtitle2" gutterBottom>
        Primary Color
      </Typography>
      <Select value={settings.primaryColor} onChange={handleColorChange} size="small">
        {COLOR_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: getColorPreview(option.value),
                  border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                }}
              />
              <Typography variant="body2">{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.drawerOpen}
      onClose={settings.onToggleDrawer}
      slotProps={{ backdrop: { invisible: true } }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: 320,
          backdropFilter: 'blur(8px)',
          backgroundColor: varAlpha(theme.palette.background.default, 0.9),
        },
      }}
    >
      {renderHead}

      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <Stack spacing={3} sx={{ px: 2.5, pb: 5 }}>
          <Box gap={2} display="grid" gridTemplateColumns="1fr">
            {renderMode}
          </Box>

          {renderColorPicker}
        </Stack>
      </Box>
    </Drawer>
  );
}
