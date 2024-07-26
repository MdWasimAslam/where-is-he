import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

const TrackingUI = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
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
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Relaxed Logo T-Shirt
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        JAHEV V1.Y5.02
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
        <CircularProgress
          variant="determinate"
          value={75}
          size={200}
          thickness={2}
          sx={{ color: '#3f51b5' }}
        />
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
      {error && <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>{error}</Typography>}

      <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
        Couldn't find it
      </Typography>
    </Box>
  );
};

export default TrackingUI;
