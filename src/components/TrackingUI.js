import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import GradientProgress from './GradientProgress';
import { useAuth } from './AuthContext';
import config from './Config';
import { keyframes } from '@mui/system';

// Define the keyframes for the pulsing animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedHeart = () => {
  return (
    <Typography
      variant="h2"
      sx={{
        display: 'inline-block',
        animation: `${pulse} 1s infinite`,
      }}
    >
      ❤️
    </Typography>
  );
};




const TrackingUI = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      
    };

    const handleError = (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        setError('User denied the request for Geolocation. Please enable it in your device settings.');
      } else {
        setError(error.message);
      }
    };

    const requestGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(handleSuccess, handleError, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    requestGeolocation();
  }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      // Handle device orientation here
      // For example: Use event.alpha, event.beta, and event.gamma to adjust arrow direction
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
  };


  // Write a function that will be called every 10 seconds 
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateUserLocation();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [location]);


  useEffect(() => {
    // Run the function immediately
    getDistance();

    // Set up the interval
    const intervalId = setInterval(() => {
      getDistance();
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

const updateUserLocation = async () => {
  try {
    const response = await axios.post(`${config.api}/geo/locationUpdate`, {
      latitude: location.latitude,
      longitude: location.longitude,
      userId: localStorage.getItem('userId'),
      coupleId: localStorage.getItem('coupleId'),
    });

    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
};


const getDistance = async () => {
  try {
    const response = await axios.post(`${config.api}/geo/distance`, {
     
        coupleId: localStorage.getItem('coupleId'),
      
    });

    // console.log(response);
    setDistance(response.data.readableDistance);
  } catch (error) {
    console.error(error);
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
        p: 2,
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Stay Connected, No Matter the Distance
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
            Where Is He?
          </Typography>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <GradientProgress />
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
             
              <AnimatedHeart />
            </Box>
          </Box>

         
          <Typography variant="h5" sx={{ mb: 1,mt:2 }}>
            {distance !== null ? `Distance: ${distance} km` : 'Calculating Distance...'}

          </Typography>
          {error && <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>{error}</Typography>}

          <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
            Beta 1.0
          </Typography>
          <Button onClick={handleLogout}>LogOut</Button>
        </>
      )}
    </Box>
  );
};

export default TrackingUI;
