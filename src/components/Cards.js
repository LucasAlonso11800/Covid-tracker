import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '1em 0',
        flexGrow: '1'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardTitle: {
        fontSize: '0.75rem',
        color: '#ffffff'
    },
    cardData: {
        fontSize: '1.25rem',
        color: '#ffffff'
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
    progress: {
        color: '#ffffff',
        justifySelf: 'center',
        alignSelf: 'center'
    }
}));

function Cards({ totalCases, totalDeaths, totalRecovered, openCases, date, isLoading }) {
    const classes = useStyles()
    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={6} md={3}>
                <Card className={classes.firstCard}>
                    <CardContent className={classes.cardContent}>
                        {isLoading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>{date} - Total Covid-19 cases</Typography>
                                <Typography className={classes.cardData}>{totalCases.toLocaleString('en-US')}</Typography>
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
                                <Typography className={classes.cardTitle}>{date} - Deaths due Covid</Typography>
                                <Typography className={classes.cardData}>{totalDeaths.toLocaleString('en-US')}</Typography>
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
                                <Typography className={classes.cardTitle}>{date} - Recovered people</Typography>
                                <Typography className={classes.cardData}>{totalRecovered.toLocaleString('en-US')}</Typography>
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
                                <Typography className={classes.cardTitle}>{date} - People currently with Covid</Typography>
                                <Typography className={classes.cardData}>{openCases.toLocaleString('en-US')}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Cards
