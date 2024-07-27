import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "./Styles/Login.css";
import logo from "../Images/logo_white.png";

const Signup = () => {
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


  const goToLogin = () => {
    navigate('/login');
  }


  React.useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      navigate('/home');
    }
  })
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        position: 'relative',
        padding: 2,
      }}
      className="bg-color"
    >
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
        onClick={() => navigate('/')}
      >
        {/* <CloseIcon /> */}
      </IconButton>

      <img src={logo} alt="logo" className="logo-login" />
      

      <div className={"loginContainer"}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb:2 }}>
        Sign Up
      </Typography>
      <Typography variant="p" sx={{ mb: 4 }}>
        Create an account to get started
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
          label: { color: 'grey' },
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
        label="Couple ID"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          mb: 2,
          input: { color: 'white' },
          label: { color: 'grey' },
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

    

      

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="loginBtn"
        sx={{
          bgcolor: '#3f51b5',
          marginBottom: 2,
          borderRadius: 15,
          '&:hover': {
            bgcolor: '#3f51b5',
          },
        }}
        onClick={handleLogin}
      >
        Sign Up
      </Button>

      <Typography variant="p" sx={{ mt: 2 }} onClick={goToLogin}>
        <i>Already have an acocunt? Login </i>
      </Typography>
      </div>
    </Box>
  );
};

export default Signup;
