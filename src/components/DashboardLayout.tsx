'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import Icon from '@/components/Icon';
import { SettingsButton, SettingsDrawer } from '@/components/ThemeControls';

const DRAWER_WIDTH = 280;

const menuItems = [
  { title: 'Dashboard', icon: 'mdi:view-dashboard', path: '/dashboard', disabled: false },
  { title: 'Laporan', icon: 'mdi:file-document', path: '/laporan', disabled: true },
  { title: 'Patroli', icon: 'mdi:shield-account', path: '/patroli', disabled: true },
  { title: 'Karyawan', icon: 'mdi:account-group', path: '/karyawan', disabled: true },
  { title: 'Area', icon: 'mdi:map-marker', path: '/area', disabled: true },
  { title: 'Pengaturan', icon: 'mdi:cog', path: '/settings', disabled: true },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_logged_in');
    router.push('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight={800} color="primary.main">
          Artdeco
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Demo Dashboard
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.title}
            title={item.disabled ? 'Disabled untuk demo' : ''}
            placement="right"
          >
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => !item.disabled && router.push(item.path)}
                disabled={item.disabled}
                selected={router.pathname === item.path}
                sx={{
                  borderRadius: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&.Mui-disabled': {
                    opacity: 0.48,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: router.pathname === item.path ? 'primary.main' : 'text.secondary',
                    ...(item.disabled && { opacity: 0.48 }),
                  }}
                >
                  <Icon icon={item.icon} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: router.pathname === item.path ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider />

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            AD
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              Admin Demo
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              admin@demo.com
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleLogout} color="error">
            <Icon icon="mdi:logout" width={20} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon icon="mdi:menu" width={24} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard Executive
          </Typography>
          <Stack direction="row" spacing={1}>
            <SettingsButton />
            <Tooltip title="Demo Mode">
              <IconButton>
                <Icon icon="mdi:information" width={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Settings Drawer */}
      <SettingsDrawer />

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
