import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  MenuItem
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  LocationOn as LocationOnIcon,
  Badge as BadgeIcon,
  WhatsApp as WhatsAppIcon,
  AlternateEmail as AlternateEmailIcon,
  Transgender as TransgenderIcon,
  CalendarToday as CalendarTodayIcon,
  Height as HeightIcon,
  Scale as ScaleIcon,
  Send as SendIcon,
  PersonAddAlt as PersonAddAltIcon,
} from '@mui/icons-material';
import { locations, identities } from '../SignUp/constants';

export default function SignUp() {
  const [form, setForm] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }
    handlePost(formData);
  };

  const handlePost = async (formData) => {
    await fetch('https://www.reto75dias.com.mx/api/methods/post-signup.php', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'x-api-key': form.employeeId,
        'User-Agent': 'Reto-75-dias-v1',
      }),
      body: formData
    })
      .then((res) => console.log(res));
  }

  return (
    <>
      <CardContent align='left'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.primary' }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Registrarse
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='fullName'
                label='Nombre Completo'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='employeeId'
                label='Numero de Empleado'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, employeeId: e.target.value })}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='phone'
                label='WhatsApp'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <WhatsAppIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='email'
                label='Correo'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, email: e.target.value })}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                select
                id='identity'
                label='Mujer/Hombre'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <TransgenderIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, identity: e.target.value })}
                variant='standard'
              >
                {identities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                select
                id='location'
                label='Ubicación'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, location: e.target.value })}
                variant='standard'
              >
                {locations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                type='number'
                defaultValue={18}
                id='age'
                label='Edad (solo número)'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, age: e.target.value })}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='height'
                label='Estatura (mts)'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HeightIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, height: e.target.value })}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                type='number'
                id='weigth'
                label='Peso (kgs)'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <ScaleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, weight: e.target.value })}
                variant='standard'
              />
            </Grid>

          </Grid>

          <Grid container spacing={2} justifyContent='end' alignItems='center'>
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                endIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Box >
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item>
            <Button size='small'><Link to={'/signin'}>{'Iniciar Sesión'}</Link></Button>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}