import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Context';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
// GraphQL
import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRY_TOTALS } from '../GraphQL/Queries';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow: 1,
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
    card: {
        boxShadow: '0 0 5px 0 #000000'
    },
    first: {
        backgroundColor: theme.palette.primary.dark,
    },
    second: {
        backgroundColor: theme.palette.success.dark,
    },
    third: {
        backgroundColor: theme.palette.warning.dark,
    },
    fourth: {
        backgroundColor: theme.palette.error.dark,
    },
    progress: {
        color: '#ffffff',
        justifySelf: 'center',
        alignSelf: 'center'
    }
}));

function Cards() {
    const classes = useStyles();
    const [filters, setFilters] = useContext(GlobalContext);

    const [getCountryTotals, { loading, data }] = useLazyQuery(GET_COUNTRY_TOTALS);
    
    useEffect(() => {
        const { country, from_date, to_date } = filters
        getCountryTotals({
            variables: {
                country,
                from_date,
                to_date
            }
        })
    }, [filters]);

    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={6} md={3}>
                <Card className={`${classes.card} ${classes.first}`}>
                    <CardContent className={classes.cardContent}>
                        {loading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Total Covid-19 cases</Typography>
                                <Typography className={classes.cardData}>{data?.countryTotals.total_confirmed[data?.countryTotals.total_confirmed.length - 1].toLocaleString('en-US')}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={`${classes.card} ${classes.second}`}>
                    <CardContent className={classes.cardContent}>
                        {loading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Recovered people</Typography>
                                <Typography className={classes.cardData}>{data?.countryTotals.total_recovered[data?.countryTotals.total_recovered.length - 1].toLocaleString('en-US')}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={`${classes.card} ${classes.third}`}>
                    <CardContent className={classes.cardContent}>
                        {loading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>People currently with Covid</Typography>
                                <Typography className={classes.cardData}>{data?.countryTotals.total_open_cases[data?.countryTotals.total_open_cases.length - 1].toLocaleString('en-US')}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card className={`${classes.card} ${classes.fourth}`}>
                    <CardContent className={classes.cardContent}>
                        {loading ?
                            <CircularProgress className={classes.progress} /> :
                            <>
                                <Typography className={classes.cardTitle}>Deaths due to Covid</Typography>
                                <Typography className={classes.cardData}>{data?.countryTotals.total_deaths[data?.countryTotals.total_deaths.length - 1].toLocaleString('en-US')}</Typography>
                            </>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Cards;
