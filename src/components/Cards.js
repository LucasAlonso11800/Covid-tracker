import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow: '1',
        margin: '1em 0',
        paddingRight: '1.5em',
        paddingLeft: '0.5em'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardTitle: {
        fontSize: '0.75rem',
        color: '#ffffff',
    },
    cardData: {
        fontSize: '1.25rem',
        color: '#ffffff'
    },
    firstCard: {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '0 0 5px 0 #000000'
    },
    secondCard: {
        backgroundColor: theme.palette.success.dark,
        boxShadow: '0 0 5px 0 #000000'
    },
    thirdCard: {
        backgroundColor: theme.palette.warning.dark,
        boxShadow: '0 0 5px 0 #000000'
    },
    fourthCard: {
        backgroundColor: theme.palette.error.dark,
        boxShadow: '0 0 5px 0 #000000'
    },
    progress: {
        color: '#ffffff',
        justifySelf: 'center',
        alignSelf: 'center'
    }
}));

function Cards({ totalCases, totalDeaths, totalRecovered, openCases, isLoading }) {
    const classes = useStyles()
    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={6} md={3}>
                <Card className={classes.firstCard}>
                    <CardContent className={classes.cardContent}>
                        {isLoading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Total Covid-19 cases</Typography>
                                <Typography className={classes.cardData}>{totalCases ? totalCases.toLocaleString('en-US') : ''}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={classes.secondCard}>
                    <CardContent className={classes.cardContent}>
                        {isLoading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Recovered people</Typography>
                                <Typography className={classes.cardData}>{totalRecovered ? totalRecovered.toLocaleString('en-US') : ''}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={classes.thirdCard}>
                    <CardContent className={classes.cardContent}>
                        {isLoading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>People currently with Covid</Typography>
                                <Typography className={classes.cardData}>{openCases ? openCases.toLocaleString('en-US') : ''}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={classes.fourthCard}>
                    <CardContent className={classes.cardContent}>
                        {isLoading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Deaths due Covid</Typography>
                                <Typography className={classes.cardData}>{totalDeaths ? totalDeaths.toLocaleString('en-US') : ''}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Cards
