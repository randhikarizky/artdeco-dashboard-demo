'use client';

import { IconButton, Tooltip } from '@mui/material';
import Icon from '@/components/Icon';
import { useSettings } from '../../../theme/settings/SettingsProvider';

export function SettingsButton() {
  const settings = useSettings();

  return (
    <Tooltip title="Settings">
      <IconButton
        onClick={settings.onToggleDrawer}
        sx={{
          p: 0,
          width: 40,
          height: 40,
        }}
      >
        <Icon icon="solar:settings-linear" width={24} />
      </IconButton>
    </Tooltip>
  );
}
