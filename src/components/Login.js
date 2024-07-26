import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'Wasim@slam1998') {
      login();
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#0a0b1c',
        color: 'white',
        position: 'relative',
        padding: 2,
      }}
    >
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
        onClick={() => navigate('/')}
      >
        {/* <CloseIcon /> */}
      </IconButton>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Login
      </Typography>

      <TextField
        variant="outlined"
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          mb: 2,
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
      />

      <TextField
        variant="outlined"
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: 4,
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          bgcolor: '#3f51b5',
          '&:hover': {
            bgcolor: '#3f51b5',
          },
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
