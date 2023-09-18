import * as React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Box, Button, CardContent, CardActions, Grid, TextField, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';

export default function SignIn() {
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
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs>
            <Button size="small"><Link to={"/forgot"}>{"Olvide mi usuario"}</Link></Button>
          </Grid>
          <Grid item>
            <Button size="small"><Link to={"/signup"}>{"Registrarse"}</Link></Button>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}