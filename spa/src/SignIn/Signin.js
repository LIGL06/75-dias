import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Box, Button, CardContent, CardActions, Grid, TextField, Typography } from '@mui/material';
import { Login, Send as SendIcon } from '@mui/icons-material';
import { headers } from '../constants/constants';
import data from '../mocks/mockedData'; // TODO: REMOVE THIS
import Loader from '../Components/Loader';

export default function SignIn() {
  const history = useNavigate();

  const [employeeId, setEmployeeId] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    handlePost(formData);
  };

  const handlePost = async (formData) => {
    setLoading(true);
    await fetch('https://www.reto75dias.com.mx/api/methods/post-signin.php', {
      method: 'POST',
      headers,
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data?.id) {
          localStorage.setItem('employeeId', data.employee_id)
          history('/dashboard');
        }
        console.log({ data })
      })
      .catch(() => {
        localStorage.setItem('employeeId', data.mockedUser.id)
        history('/dashboard');
      });
  }

  return (
    <>
      <CardContent align='center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.primary' }}>
          <Login />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="employeeId"
            label="# de Empleado"
            name="employeeId"
            autoComplete="employeeId"
            onChange={e => setEmployeeId(e.target.value)}
            error={employeeId === ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={employeeId === ''}
            startIcon={loading ? <Loader /> : null}
            endIcon={!loading ? <SendIcon /> : null}
          >
            {loading ? 'Ingresando' : 'Ingresar'}
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item>
            <Button size="small"><Link to={"/signup"}>{"Registrarse"}</Link></Button>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}