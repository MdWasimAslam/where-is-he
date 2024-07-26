import React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const GradientCircularProgress = styled(CircularProgress)(({ theme }) => ({
  // Style the circular progress component
  '& .MuiCircularProgress-circle': {
    stroke: 'url(#gradient)', // Apply gradient defined in SVG
  },
}));

const GradientProgress = () => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Define the gradient */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgba(252,14,6,1)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(0,44,255,1)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Apply gradient to CircularProgress */}
      <GradientCircularProgress
        variant="determinate"
        value={100}
        size={200}
        thickness={2} // Adjust thickness as needed
      />
    </div>
  );
};

export default GradientProgress;
