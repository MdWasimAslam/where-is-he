// Topbar.jsx
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Topbar = () => {
  const username = localStorage.getItem('username') === 'wasi' ? 'Wasi' : 'Sheezu';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        p: 2,
        bgcolor: '#0a0b1c',
        color: 'white',
      }}
    >
      <Typography variant="h5">
        Welcome {username}
      </Typography>
      <Avatar alt={username} src="/path/to/profile/image.jpg" />
    </Box>
  );
};

export default Topbar;
