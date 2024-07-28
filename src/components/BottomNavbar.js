import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BottomNavbar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: '#0a0b1c',
        boxShadow: '0 -2px 10px rgb(0 0 0 / 69%)',
        '& .Mui-selected': {
          color: '#ff4081', // Highlight color for the selected item
        },
      }}
    >
      <BottomNavigationAction
        icon={<LocationOnIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={{
          color: 'white',
          '&.Mui-selected': {
            color: '#34aadc', // Highlight color for the selected item
          },
        }}
      />
      <BottomNavigationAction
        icon={<RestoreIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={{
          color: 'white',
          '&.Mui-selected': {
            color: '#34aadc', // Highlight color for the selected item
          },
        }}
      />
      <BottomNavigationAction
        icon={<FavoriteIcon sx={{ fontSize: 30 }} />} // Increase icon size here
        sx={{
          color: 'white',
          '&.Mui-selected': {
            color: '#34aadc', // Highlight color for the selected item
          },
        }}
      />
      
    </BottomNavigation>
  );
};

export default BottomNavbar;
