import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow: 1,
        padding: '0 0.5em',
        height: '100%'
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
        flexDirection: 'column',
    },
    card: {
        boxShadow: '0 0 5px 0 #000000',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    first: {
        backgroundColor: theme.palette.primary.dark
    },
    second: {
        backgroundColor: theme.palette.success.dark
    },
    third: {
        backgroundColor: theme.palette.warning.dark,
    },
    fourth: {
        backgroundColor: theme.palette.error.dark,
    }
}));

function Percentages({ increaseCases, increaseDeaths, increaseOpenCases, increaseRecovered }) {
    const classes = useStyles()
    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={3} sm={6}>
                <Card className={`${classes.card} ${classes.first}`}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Cases increase since yesterday</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseCases) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>
                <Card className={`${classes.card} ${classes.second}`}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Recovered people increase since yesterday</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseRecovered) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>
                <Card className={`${classes.card} ${classes.third}`}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Open cases increase since yesterday</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseOpenCases) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3} sm={6}>
                <Card className={`${classes.card} ${classes.fourth}`}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardTitle}>Deaths increase since yesterday</Typography>
                        <Typography className={classes.cardData}>{(Number(increaseDeaths) * 100).toFixed(2)}%</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Percentages;