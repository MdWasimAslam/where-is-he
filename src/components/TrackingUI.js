import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress, Avatar, AppBar, Toolbar } from '@mui/material';
import GradientProgress from './GradientProgress';
import { useAuth } from './AuthContext';
import config from './Config';
import { keyframes } from '@mui/system';
import BottomNavbar from './BottomNavbar';

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

    updateLocationAndDistance();
    const intervalId = setInterval(updateLocationAndDistance, 10000);

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Hello Wasim</Typography>
          <Avatar />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          textAlign: 'center',
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
              {distance !== null ? `${distance} km` : 'Calculating Distance...'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '15px', color: 'grey', mt: 1 }}>
              from your partner
            </Typography>

            {error && (
              <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>
                {error}
              </Typography>
            )}

            <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
              Beta 1.0
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
              Log Out
            </Button>
          </>
        )}
      </Box>
      
      <BottomNavbar />
    </Box>
  );
};

export default TrackingUI;
