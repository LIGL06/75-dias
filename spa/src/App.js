import * as React from 'react';
import { RouterProvider } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import router from './routes/routes';
import Footer from './Components/Footer';

function App() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction="column" spacing={5} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 500 }}>
                        <RouterProvider router={router} />
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Box>
    )
}

export default App;