import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    text: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '0.5em'
    },
    gridContainer: {
        flexGrow: 1,
        height: '100vh',
        marginTop: '0.5em',
    },
    gridItem: {
        height: '50vh',
        padding: '0.5em'
    }
}));

function GlobalDashboard() {
    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.text}
                variant='h4'
            >
                Global statistics
            </Typography>

            <Grid
                container
                className={classes.gridContainer}
                justify='space-around'
                alignItems='center'
            >
                <Grid
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                >
                    Lol
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                >
                    Lol
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                >
                    Lol
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                >
                    Lol
                </Grid>
            </Grid>
        </>
    )
};

export default GlobalDashboard;
