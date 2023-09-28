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
        <Typography variant='h4' gutterBottom>
          ¡Bienvenidos...<br />al reto 75 días!
        </Typography>
        <Grid container >
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 3x`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </Grid>
        <br />
        <Typography variant='h5' component='div'>
          bie{bull}nes{bull}tar{bull}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary' gutterBottom>
          nombre masculino
        </Typography>
        <Typography variant='body1' gutterBottom>
          Estado de la persona cuyas condiciones físicas y mentales le proporcionan un sentimiento de satisfacción y tranquilidad.
          <br />
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          'con este reto vas a notar una sensación de bienestar general en todo tu cuerpo'
        </Typography>
        <br />
      </CardContent>
      <CardActions>
        <LandingActions />
      </CardActions>
    </>
  );
}