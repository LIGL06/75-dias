import * as React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Box, Button, CardActions, CardContent, TextField, Grid, Typography, InputAdornment, MenuItem } from '@mui/material';
import { PersonAddAlt as PersonAddAltIcon, AccountCircle as AccountCircleIcon, LocationOn as LocationOnIcon, Badge as BadgeIcon, WhatsApp as WhatsAppIcon, AlternateEmail as AlternateEmailIcon, Transgender as TransgenderIcon, CalendarToday as CalendarTodayIcon, Height as HeightIcon, Scale as ScaleIcon } from '@mui/icons-material';
import { locations, identities } from '../SignUp/constants';

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <CardContent align='left'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.primary' }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Nombre Completo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="employeeId"
                label="Numero de Empleado"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="phone"
                label="WhatsApp"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WhatsAppIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                select
                id="identity"
                label="Mujer/Hombre"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TransgenderIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
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
                id="location"
                label="Ubicación"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
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
                type="number"
                defaultValue={18}
                id="age"
                label="Edad (solo número)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="height"
                label="Estatura (mts)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HeightIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id="weigth"
                label="Peso (kgs)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScaleIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>

          </Grid>

          <Grid container spacing={2} justifyContent="end" alignItems="center">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
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
            <Button size="small"><Link to={"/signin"}>{"Iniciar Sesión"}</Link></Button>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}