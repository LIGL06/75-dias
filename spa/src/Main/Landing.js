/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CardContent, CardActions, CardMedia, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import LandingActions from './LandingActions';

const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const history = useNavigate();

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    if (employeeId) {
      history('/dashboard');
    }
  }, [])

  const item = {
    img: 'https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-beneficios_rd0qfb.jpg',
    title: 'beneficios-logo'
  };

  return (
    <>
      <CardMedia
        component="img"
        alt="logo-reto"
        height="140"
        image="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-logo_pxkjkn.jpg"
      />
      <CardContent>
        <Typography variant='h4' align='center' gutterBottom>
          BIENVENIDOS
        </Typography>
        <Typography variant='h4' align='center' gutterBottom>
          RETO 75 DÍAS
        </Typography>
        <Typography variant='body2' align='center' color='text.secondary' gutterBottom>
          Con este reto vas a notar una sensación de bienestar general en todo tu cuerpo
        </Typography>
        <br />
      </CardContent>
      <CardActions>
        <LandingActions />
      </CardActions>
    </>
  );
}