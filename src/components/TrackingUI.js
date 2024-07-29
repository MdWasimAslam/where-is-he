import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Avatar, AppBar, Toolbar } from '@mui/material';
import GradientProgress from './GradientProgress';
import config from './Config';
import BottomNavbar from './BottomNavbar';
import profileImage1 from '../Images/ProfileImg1.jpeg';
import profileImage2 from '../Images/ProfileImg2.jpg';
import "./Styles/TrackingUi.css";





const formatTimeDifference = (lastUpdated) => {
  const now = new Date();
  const updatedTime = new Date(lastUpdated);
  const differenceInSeconds = Math.floor((now - updatedTime) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} minutes ago`;
  } else {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hours ago`;
  }
};

const TrackingUI = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null); // State to store last update time
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');
  const [selectedNav, setSelectedNav] = useState(0); // State for tracking selected navigation item

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
          timeout: 10000, // 10 seconds
          maximumAge: 0,
        });
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    requestGeolocation();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  const updateUserLocation = useCallback(async () => {
    try {
      const response = await axios.post(`${config.api}/location/update`, {
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        user_Id: localStorage.getItem('userId'),
        coupleId: localStorage.getItem('coupleId'),
      });

      if (response.data && response.data.distance) {
        setDistance(response.data.distance);
        setLastUpdated(response.data.lastUpdated);
      }
    } catch (error) {
      console.error(error);
    }
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const updateLocationAndDistance = () => {
      if (location.latitude && location.longitude) {
        updateUserLocation();
      }
    };

    // Call immediately, then set up interval
    updateLocationAndDistance();
    const intervalId = setInterval(updateLocationAndDistance, 25000); // 25 seconds

    return () => clearInterval(intervalId);
  }, [location, updateUserLocation]);

  useEffect(() => {
    if (lastUpdated) {
      const intervalId = setInterval(() => {
        setTimeSinceUpdate(formatTimeDifference(lastUpdated));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastUpdated]);

  const handleNavChange = (newValue) => {
    setSelectedNav(newValue);
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
      {/* Topbar */}
      
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '75px', padding: '5px 25px' }}>
          <Typography variant="h5" style={{ fontFamily: 'poppins' }}>
            Hi, {localStorage.getItem('username') === 'wasi' ? <>Wasi</> : <>Sheeza</>}
          </Typography>
          {localStorage.getItem('username') === 'wasi' ? (
            <Avatar alt="Wasi" src={profileImage2} style={{ border: "1px solid white" }} />
          ) : (
            <Avatar alt="Sheezu" src={profileImage1} style={{ border: "1px solid white" }} />
          )}
        </Toolbar>
      </AppBar>

      {
        selectedNav === 0 ? (
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
                    <div class="heart-loader"></div>
                  </Box>
                </Box>

                <Typography variant="h5" sx={{ mb: 0, mt: 2 }}>
                  {distance !== null ? `${distance} km` : 'Calculating Distance...'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '15px', color: 'grey', mt: 1 }}>
                  from your partner
                </Typography>

                {error && (
                  <Typography variant="body2" sx={{ mt: 2, color: '#ff0000' }}>
                    {error}
                    {window.location.reload()}
                  </Typography>
                )}

                <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
                  Loving you is like breathing; I can’t stop, and I don’t want to.
                </Typography>

                {lastUpdated && (
                  <Typography variant="body2" sx={{ mt: 2, color: '#757575' }}>
                    Last updated: {timeSinceUpdate}
                  </Typography>
                )}
              </>
            )}
          </Box>) : selectedNav === 1 ? (
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
              <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
                Coming Soon 1...
              </Typography>
            </Box>
          ) : selectedNav === 2 ? (
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
              <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
                Coming Soon 2...
              </Typography>
            </Box>

          ) : (
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
            <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
              Coming Soon...
            </Typography>
          </Box>
        )
      }

      <BottomNavbar selectedNav={selectedNav} onNavChange={handleNavChange} />
    </Box>
  );
};

export default TrackingUI;
