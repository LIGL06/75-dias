import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import router from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={6}>
          <RouterProvider router={router} />
        </Grid>
      </Grid>
    </Box>
  </React.StrictMode>
);
