import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GradientProgress from './GradientProgress';

const TRACKING_UI = {
  destination: { latitude: 22.54321104358877, longitude: 88.35155530898258 },
};

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const TrackingUI = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      const dist = haversineDistance(
        { latitude, longitude },
        TRACKING_UI.destination
      );
      setDistance(dist.toFixed(1));
    };

    const handleError = (error) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
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
          <Typography variant="h2" sx={{ transform: 'rotate(45deg)' }}>
            ➔
          </Typography>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 1 }}>
        {location.latitude !== null ? `Latitude: ${location.latitude.toFixed(5)}` : 'Fetching...'}
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {location.longitude !== null ? `Longitude: ${location.longitude.toFixed(5)}` : 'Fetching...'}
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {distance !== null ? `Distance: ${distance} km` : 'Calculating Distance...'}
      </Typography>
      {error && <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>{error}</Typography>}

      <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
        Beta 1.0
      </Typography>
      <Button onClick={()=>{
        localStorage.removeItem('auth')
        window.location.reload()
      }}>LogOut</Button>
    </Box>
  );
};

export default TrackingUI;
