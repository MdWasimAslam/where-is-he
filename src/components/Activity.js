import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import trophy from '../Images/trophy.png';
import coin from '../Images/coin.png';
import './Styles/Activity.css';

const Activity = () => {
  return (
    <div>
      <RankCard/>
      <ActivityOptions/>
    </div>
  )
}

export default Activity



export const RankCard = () => {
  return (
    <div>
           <Box className="card-container">
         <Card className="rank-card">
           <div className="rank-section">
            <img src={trophy} alt="trophy" className="icon" />
            <div className="text-section">
              <Typography variant="p" className="label">Rank</Typography>
              <Typography variant="h6" className="value">1</Typography>
            </div>
          </div>
          <hr className="divider"/>
           <div className="points-section">
             <img src={coin} alt="coin" className="icon" />
             <div className="text-section">
               <Typography variant="p" className="label">Points</Typography>
               <Typography variant="h6" className="value">348</Typography>
             </div>
           </div>
         </Card>
       </Box>
    </div>
  )
}



export const ActivityOptions = () => {
  return (
    <div>
      <div className='activity-grid-container'>
        
      </div>
    </div>
  )
}
