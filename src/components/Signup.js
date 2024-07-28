import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "./Styles/Login.css";
import logo from "../Images/logo_white.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [coupleId, setCoupleId] = useState('');



  const handleSignup = () => {

    console.log(username, password, coupleId);
    if (username.length>0  && password.length>0 && coupleId.length>0) {
      signup({username: username, password: password, coupleId: coupleId});
    } else {
      toast.error('Please fill all the fields');
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
    <>
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
        value={coupleId}
        onChange={(e) => setCoupleId(e.target.value)}
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
        onClick={handleSignup}
      >
        Sign Up
      </Button>

      <Typography variant="p" sx={{ mt: 2 }} onClick={goToLogin}>
        <i>Already have an acocunt? Login </i>
      </Typography>
      </div>

    </Box>
    <ToastContainer />
    </>
   
  );
};

export default Signup;
