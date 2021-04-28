import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow: 1,
    },
    cardTitle: {
        fontSize: '0.75rem',
        color: '#ffffff',
        textAlign: 'center'
    },
    cardData: {
        fontSize: '1.25rem',
        color: '#ffffff',
        textAlign: 'center'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    firstCard: {
        backgroundColor: theme.palette.primary.main
    },
    secondCard: {
        backgroundColor: theme.palette.secondary.main
    },
    thirdCard: {
        backgroundColor: theme.palette.warning.main
    },
    fourthCard: {
        backgroundColor: theme.palette.error.main
    },
}));

function Percentages({ increaseCases, increaseDeaths, increaseOpenCases, increaseRecovered }) {
    const classes = useStyles()
    return (
        <Grid
            container
            className={classes.gridContainer}
            spacing={2}
        >
            <Grid item xs={3} sm={6}>
                <Card className={classes.firstCard}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Total cases increase</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseCases) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>

                <Card className={classes.secondCard}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Total deaths increase</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseDeaths) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>
                <Card className={classes.thirdCard}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Total open cases increase</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseOpenCases) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>
                <Card className={classes.fourthCard}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Total recovered increase</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseRecovered) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Percentages
