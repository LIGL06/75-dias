/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, CardActions, CardMedia, Typography, Grid } from '@mui/material';
import LandingActions from './LandingActions';
import { headers } from '../constants/constants';

export default function BasicCard() {
  const history = useNavigate();
  const [, setLoading] = useState(true);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (JSON.parse(user)) {
      history('/dashboard');
    }
    fetch('https://www.reto75dias.com.mx/api/methods/get-day-phrase.php?' + new URLSearchParams({
      day: Math.floor(Math.random() * 74) + 1,
    }), {
      method: 'GET',
      headers,
    })
      .then(res => res.json())
      .then(data => {
        setPhrase(data?.content);
        setLoading(false);
      })
      .catch(() => {
        alert('Por el momento no podemos obenter una frase. \n Por favor, intente más tarde');
        setLoading(false);
      });
  }, [])

  const randomColor = () => {
    const colors = ['#824EDC', '#ECF8CC', '#ED6BE8', '#D0FA66', '#ABDFF7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

  return (
    <>
      <CardMedia
        component="img"
        alt="logo-reto"
        height="100%"
        image="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-logo_pxkjkn.jpg"
      />
      <CardContent>
        <Typography variant='h4' align='center' gutterBottom sx={{ mb: 2, color: 'orange', fontWeight: 800 }}>
          BIENVENIDOS
        </Typography>
        <Typography variant='h4' align='center' gutterBottom sx={{ fontWeight: 700, color: '#5EC4CC', fontFamily: 'Paytone One, sans-serif' }}>
          RETO 75 DÍAS
        </Typography>
        <Typography variant='body2' align='center' gutterBottom>
          {phrase}
        </Typography>
        <Grid container>
          <Grid item xs justifyContent="center">
            <img
              style={{ maxHeight: 100 }}
              alt="sponsor-logo"
              src="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-creator_xjqjiq.jpg"
            />
          </Grid>
          <Grid>
            <img
              style={{ maxHeight: 100 }}
              alt="benefits-logo"
              src="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-beneficios_rd0qfb.jpg"
            />
          </Grid>
        </Grid>
        <br />
      </CardContent>
      <CardActions>
        <LandingActions />
      </CardActions>
    </>
  );
}