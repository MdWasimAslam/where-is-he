import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress, Avatar } from '@mui/material';
import GradientProgress from './GradientProgress';
import { useAuth } from './AuthContext';
import config from './Config';
import { keyframes } from '@mui/system';
import BottomNavbar from './BottomNavbar';
import Topbar from './Topbar.js';
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

const AnimatedHeart = ({ distance }) => {
  // Calculate animation duration based on distance
  const animationDuration = distance !== null ? Math.max(0.5, Math.min(3, distance / 10)) : 1;

  return (
    <Typography
      variant="h2"
      sx={{
        display: 'inline-block',
        animation: `${pulse} ${animationDuration}s infinite`,
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

  useEffect(() => {
    const updateLocationAndDistance = () => {
      if (location.latitude && location.longitude) {
        updateUserLocation();
        getDistance();
      }
    };

    // Run the function immediately
    updateLocationAndDistance();

    // Set up the interval
    const intervalId = setInterval(updateLocationAndDistance, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [location]);

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

      setDistance(response.data.readableDistance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#0a0b1c',
        color: 'white',
        position: 'relative',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        <h4 style={{marginLeft:"25px"}}>Hello Wasim</h4>
        <Avatar style={{marginRight:"25px"}}  />

      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)', // Adjust height to account for the Topbar
          p: 2,
        }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
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
                <AnimatedHeart distance={distance} />
              </Box>
            </Box>

            <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
              <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} >
                <div>{distance !== null ? `${distance} km` : 'Calculating Distance...'}</div>
                <div style={{fontSize:'15px',color:'grey',marginTop:'10px'}}>from your partner</div>
              </div>
            </Typography>

            {error && <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>{window.location.reload()}</Typography>}

            <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
              Beta 1.0
            </Typography>
            <Button onClick={handleLogout}>LogOut</Button>
          </>
        )}
        <BottomNavbar />
      </Box>
    </Box>
  );
};

export default TrackingUI;
