import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAuth } from './AuthContext';
import { Logout } from '@mui/icons-material';

// Reusable styles for BottomNavigationAction
const actionStyles = {
  color: 'grey',
  justifyContent: 'unset', // Center the icon
  marginTop: '10px', // Increase top margin
  '&.Mui-selected': {
    color: 'white', // Highlight color for the selected item
    justifyContent: 'unset', // Center the icon
  },
};

const BottomNavbar = ({ selectedNav, onNavChange }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <BottomNavigation
      value={selectedNav}
      onChange={(event, newValue) => {
        onNavChange(newValue);
      }}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 80, // Increased height
        bgcolor: 'transparent', // Make background transparent for gradient
        background: 'black', // Gradient background
        boxShadow: '0 -2px 10px rgb(0 0 0 / 69%)',
        '& .Mui-selected': {
          color: '#F15F79', // Highlight color for the selected item
        },
      }}
    >
      <BottomNavigationAction
        icon={<LocationOnIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={actionStyles}
      />
      <BottomNavigationAction
        icon={<RestoreIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={actionStyles}
      />
      <BottomNavigationAction
        icon={<FavoriteIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={actionStyles}
      />
      <BottomNavigationAction
        icon={<Logout sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={actionStyles}
        onClick={handleLogout}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
