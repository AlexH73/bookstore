import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Google,
  Facebook,
  ErrorOutline,
} from '@mui/icons-material';

import {
  TextField,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const validateForm = (): boolean => {
    clearError();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await login(email, password);
    if (success) navigate(from, { replace: true });
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`${provider} login clicked`);
    setFormError(
      `${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      } login is not implemented yet`
    );
  };

  return (
    <div className='min-h-screen flex items-center justify-center text-gray-700 dark:bg-gray-900 dark:text-gray-400 py-12 px-4'>
      <div className='max-w-2xl w-full space-y-8 bg-linear-to-r from-gray-100 to-blue-900/20 text-gray-900 dark:from-gray-800 dark:to-blue-950 dark:text-gray-400 rounded-2xl shadow-xl p-8'>
        {/* Header */}
        <div className='text-center'>
          <div className='mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-md'>
            <LoginIcon className='w-8 h-8 text-gray-700 dark:text-gray-400' />
          </div>
          <h2 className='text-3xl font-bold'>Welcome Back</h2>
          <p className='mt-2 text-muted-foreground'>Sign in to your account</p>
        </div>

        {/* Social Login */}
        <div className='space-y-3'>
          <Button
            fullWidth
            onClick={() => handleSocialLogin('google')}
            variant='outlined'
            startIcon={<Google />}
            sx={{
              py: 1.4,
              color: 'var(--foreground)',
              mb: 1.4,
              borderColor: 'var(--border)',
              '&:hover': { background: 'var(--background)' },
            }}
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            onClick={() => handleSocialLogin('facebook')}
            variant='outlined'
            startIcon={<Facebook />}
            sx={{
              py: 1.4,
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
              '&:hover': { background: 'var(--background)' },
            }}
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-border' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-4 text-muted-foreground'>
              Or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            label='Email Address'
            type='email'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email sx={{ color: 'var(--muted-foreground)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                color: 'var(--foreground)',
                mb: 1.8,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--border)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary)',
              },
              '& .MuiInputLabel-root': {
                color: 'var(--muted-foreground)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--primary)',
              },
            }}
          />

          {/* Password */}
          <FormControl fullWidth variant='outlined'>
            <InputLabel
              sx={{
                color: 'var(--muted-foreground)',
                '&.Mui-focused': { color: 'var(--primary)' },
              }}
            >
              Password
            </InputLabel>

            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              startAdornment={
                <InputAdornment position='start'>
                  <Lock sx={{ color: 'var(--muted-foreground)' }} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOff
                        sx={{ color: 'var(--muted-foreground)' }}
                      />
                    ) : (
                      <Visibility sx={{ color: 'var(--muted-foreground)' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              sx={{
                color: 'var(--foreground)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--border)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--primary)',
                },
              }}
            />
          </FormControl>

          {/* Remember me */}
          <div className='flex items-center gap-2'>
            <input
              id='remember'
              type='checkbox'
              className='h-4 w-4 text-primary border-border rounded focus:ring-primary'
            />
            <label htmlFor='remember' className='text-sm text-muted-foreground'>
              Remember me
            </label>
          </div>

          {/* Errors */}
          {(error || formError) && (
            <div className='flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 border border-red-500/30 text-sm'>
              <ErrorOutline />
              <span>{error || formError}</span>
            </div>
          )}

          {/* Submit */}
          <Button
            type='submit'
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.6,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: 'var(--primary)',
              color: 'var(--foreground)',
              '&:hover': {
                backgroundColor: 'var(--accent)',
              },
              borderRadius: '0.75rem',
            }}
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className='text-center'>
          <p className='text-muted-foreground'>
            Don't have an account?{' '}
            <Link to='/register' className='text-primary hover:underline'>
              Sign up
            </Link>
          </p>

          <p className='mt-4 text-sm text-muted-foreground'>
            By continuing, you agree to our{' '}
            <Link to='/terms' className='text-primary hover:underline'>
              Terms
            </Link>{' '}
            and{' '}
            <Link to='/privacy' className='text-primary hover:underline'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
