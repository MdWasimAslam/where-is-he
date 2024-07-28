import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "./Styles/Login.css";
import logo from "../Images/logo_white.png";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
      await login({username: username, password: password});    
  };


  const SignUp = () => {
    navigate('/signup');
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
        alignItems: 'baseline',
        height: '100vh',
        color: 'white',
        position: 'relative',
        padding: 2,
        marginLeft: 2,
      }}
      className="bg-color"
    >
      

      <img src={logo} alt="logo" className="logo-login" />
      

      <div className={"loginContainer"}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb:2 }}>
        Login
      </Typography>
      <Typography variant="p" sx={{ mb: 4 }}>
        Welcome back! Please login to your account.
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

      {/* <Typography variant="p" sx={{ mb: 4 }}>
        Forgot password?
      </Typography> */}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="loginBtn"
        sx={{
          bgcolor: '#3f51b5',
          marginBottom: 2,
          borderRadius: 15,
          marginTop: 2,
          '&:hover': {
            bgcolor: '#3f51b5',
          },
        }}
        onClick={handleLogin}
      >
        Login
      </Button>

      {/* <Typography variant="p" sx={{ mt: 2 }} onClick={SignUp}>
        <i>Don't have an account? Sign up </i>
      </Typography> */}
      </div>
    </Box>  
  );
};

export default Login;
