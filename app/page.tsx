'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { api } from '@/utils/api';

export default function SignInCard() {
  const [name, setName] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      console.error('Name is required');
      return;
    }
    try {
      const response = await api().post('/api/test/create', { name });
      console.log('Response:', response);
      setName('');
    } catch (error) {
      console.error('Error creating test:', error);
    }
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: 'clamp(2rem, 6vw, 2.25rem)',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Sign In
        </Typography>

        {/* Form */}
        <Box
          component="form"
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* name Field */}
          <FormControl fullWidth>
            <FormLabel htmlFor="name">name</FormLabel>
            <TextField
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              variant="outlined"
              fullWidth
            />
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" variant="contained" size="large" fullWidth onClick={handleSubmit}>
            Create
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" variant="body2">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
