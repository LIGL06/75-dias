import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
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

  useEffect(()=>{
    if (localStorage.getItem('employeeId')) {
      history('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CardContent>
        <Typography variant='h1'>
          ¡Bienvenidos...
        </Typography>
        <Typography variant='h3' gutterBottom>
          al reto 75 días!
        </Typography>
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