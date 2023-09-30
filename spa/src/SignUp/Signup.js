/* eslint-disable no-useless-escape */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  MenuItem,
  FormControlLabel,
  Checkbox,
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
import { AppContext } from '../App';
import { headers, locations, identities } from '../constants/constants';
import Loader from '../Components/Loader';

export default function SignUp() {
  const history = useNavigate();
  const [form, setForm] = useState({
    age: 17
  });
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext)

  useEffect(() => {
    const isValid = !!((form.age && form.email) &&
      (form.employeeId && form.fullName) &&
      (form.height && form.identity) &&
      (form.phone && form.weight));
    setValid(isValid)
  }, [form])

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }
    handlePost(formData);
  };

  const handlePost = async (formData) => {
    setLoading(true);
    await fetch('https://www.reto75dias.com.mx/api/methods/post-signup.php', {
      method: 'POST',
      headers,
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data?.id) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data))
          localStorage.setItem('employeeId', data.employee_id)
          history('/dashboard');
        }
      })
      .catch(() => {
        alert('Por el momento no podemos crear el registro. \nPor favor, intente más tarde');
        setLoading(false);
      });
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
                label='Nombre Completo (sin acentuación)'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                error={!form?.fullName?.match(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/)}
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
                error={!form?.employeeId?.match(/^\d+$/)}
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
                error={!form?.phone?.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)}
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
                error={!form?.email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}
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
                error={form.identity === ''}
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
                error={form.location === ''}
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
                defaultValue={17}
                id='age'
                label='Edad (solo número)'
                inputProps={{
                  step: 1,
                  min: 18,
                  max: 100
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, age: e.target.value })}
                error={(form.age <= 17 || form.age > 100)}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                id='height'
                type="number"
                label='Estatura (mts)'
                defaultValue={1}
                inputProps={{
                  step: 0.01,
                  min: 1,
                  max: 2
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HeightIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, height: parseFloat(e.target.value).toFixed(2) })}
                error={!(form.height >= 1.00 && form.height <= 2.00)}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <TextField
                required
                fullWidth
                type='number'
                id='weight'
                label='Peso (kgs)'
                defaultValue={10}
                inputProps={{
                  step: 0.05,
                  min: 10,
                  max: 150
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <ScaleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => setForm({ ...form, weight: e.target.value })}
                error={!(form.weight >= 10.00 && form.weight <= 150.00)}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12} lg={8}>
              <FormControlLabel
                control={
                  <Checkbox onChange={e => setForm({ ...form, sindicalized: e.target.checked })} defaultChecked={false} name="sindicalized" />
                }
                label="Sindicalizado"
              />
            </Grid>

          </Grid>

          <Grid container spacing={2} justifyContent='end' alignItems='center'>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={loading ? <Loader /> : null}
                endIcon={!loading ? <SendIcon /> : null}
                disabled={!valid}
              >
                {loading ? 'Registrando' : 'Registrar'}
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