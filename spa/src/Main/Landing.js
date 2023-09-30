/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import LandingActions from './LandingActions';
import { headers } from '../constants/constants';
import Loader from '../Components/Loader';

export default function BasicCard() {
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    if (employeeId) {
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

  return (
    <div sx={{ mt: 10 }}>
      <CardMedia
        component="img"
        alt="logo-reto"
        height="140"
        image="https://res.cloudinary.com/hammock-software/image/upload/v1695849364/reto-logo_pxkjkn.jpg"
      />
      <CardContent>
        <Typography variant='h4' align='center' gutterBottom sx={{ mb: 5 }}>
          BIENVENIDOS
        </Typography>
        <Typography variant='h4' align='center' gutterBottom>
          RETO 75 DÍAS
        </Typography>
        <Typography variant='body2' align='center' color='text.secondary' gutterBottom>
          {phrase}
        </Typography>
        <br />
      </CardContent>
      <CardActions>
        <LandingActions />
      </CardActions>
    </div>
  );
}