/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
    CardMedia,
    Grid, Typography,
} from '@mui/material';

export default function FinishedForm({ isFinished }) {

    console.log({ isFinished })

    return (
        <>
            <Grid container>
                <Grid item xs>
                    {isFinished ? (<>
                        <Typography variant="h5" align="center">
                            Gracias por tu registro
                        </Typography>
                        <Typography variant="subtitle1">
                            ¡Gracias por tu constante apoyo!<br /> Agradecemos profundamente tu valiosa contribución. <br />Tu dedicación y esfuerzo han hecho posible grandes logros en tu bienestar.
                        </Typography>
                        <CardMedia
                            component="img"
                            alt="logo-reto"
                            height="200"
                            image="https://res.cloudinary.com/hammock-software/image/upload/v1696017048/image_processing20200923-25801-ap32wl_a3xs1e.gif"
                        />
                    </>) : (
                        <>
                            <Typography variant="h5" align="center">
                                Gracias por tu registro
                            </Typography>
                            <Typography variant="caption" >
                                Mañana será un día nuevo.<br />
                                ¡No olvides registrar tu progreso!
                            </Typography>
                            <CardMedia
                                component="img"
                                alt="logo-reto"
                                height="200"
                                image="https://res.cloudinary.com/hammock-software/image/upload/v1696015255/celebration_jbzch9.gif"
                            />
                        </>
                    )}

                </Grid>
            </Grid>
        </>
    );
}