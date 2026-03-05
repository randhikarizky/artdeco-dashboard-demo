'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  Stack,
  TextField,
  Typography,
  Button,
  Container,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Icon from '@/components/Icon';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Dummy login validation
    if (email === 'admin@demo.com' && password === 'demo123') {
      localStorage.setItem('demo_logged_in', 'true');
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } else {
      setError('Email atau password salah. Gunakan: admin@demo.com / demo123');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 5, boxShadow: 24 }}>
          <Stack spacing={3}>
            {/* Logo */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="primary.main">
                Artdeco
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Demo Dashboard Executive
              </Typography>
            </Box>

            {/* Title */}
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Masuk ke Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Masukkan email dan password untuk mengakses dashboard
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {/* Demo Credentials Box */}
            <Alert severity="info" icon={<Icon icon="mdi:information" width={24} />}>
              <Typography variant="subtitle2" fontWeight={600}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2">
                Email: <strong>admin@demo.com</strong>
              </Typography>
              <Typography variant="body2">
                Password: <strong>demo123</strong>
              </Typography>
            </Alert>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="mdi:email" width={20} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="mdi:lock" width={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width={20} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Loading...' : 'Masuk'}
                </Button>
              </Stack>
            </form>

            {/* Footer Note */}
            <Typography variant="caption" color="text.secondary" textAlign="center">
              Ini adalah demo dashboard. Tidak ada koneksi ke backend yang sebenarnya.
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
