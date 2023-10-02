/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
    CardMedia,
    Grid, Typography,
} from '@mui/material';

export default function FinishedForm({ isFinished }) {

    return (
        <>
            <Grid container justifyContent="center" alignContent="center" >
                <Grid xs={12} lg={12}>
                    {isFinished ? (<>
                        <Typography vcomponent="h1" variant="h4" align="center" sx={{ fontWeight: 700, color: '#5EC4CC', fontFamily: 'Young Serif, serif' }}>
                            Gracias por tu registro
                        </Typography>
                        <Typography variant="subtitle1">
                            ¡Gracias por tu constante apoyo!<br /> Agradecemos profundamente tu valiosa contribución. <br />Tu dedicación y esfuerzo han hecho posible grandes logros en tu bienestar.
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="logo-reto"
                            image="https://res.cloudinary.com/hammock-software/image/upload/v1696017048/image_processing20200923-25801-ap32wl_a3xs1e.gif"
                            sx={{
                                maxHeight: 400,
                            }}
                        />
                    </>) : (
                        <>
                            <Typography vcomponent="h1" variant="h4" align="center" sx={{ fontWeight: 700, color: '#5EC4CC', fontFamily: 'Young Serif, serif' }}>
                                Gracias por tu registro
                            </Typography>
                            <Typography variant="subtitle1" >
                                Mañana será un día nuevo.<br />
                                ¡No olvides registrar tu progreso!
                            </Typography>
                            <CardMedia
                                component="img"
                                alt="logo-reto"
                                image="https://res.cloudinary.com/hammock-software/image/upload/v1696015255/celebration_jbzch9.gif"
                                sx={{
                                    maxHeight: 400,
                                }}
                            />
                        </>
                    )}

                </Grid>
            </Grid>
        </>
    );
}