import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Context';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';
// Functions
import { generateOptions, generateDatasets } from '../functions';
// GraphQL
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_COUNTRY_DAILY_INFO, GET_COUNTRY_TOTALS, GET_DATES } from '../GraphQL/Queries';

import Percentages from './Percentages';

const useStyles = makeStyles(() => ({
    gridContainer: {
        flexGrow: 1,
        padding: '0 0.5em'
    },
    gridItem: {
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        color: '#000000'
    },
    chart: {
        backgroundColor: '#ffffff',
        margin: '0.5em',
        padding: '0.5em',
        borderRadius: '1em',
        boxShadow: '0 0 5px 0'
    }
}));

function Charts() {
    const classes = useStyles();
    const [filters, setFilters] = useContext(GlobalContext);

    const { country, from_date, to_date } = filters
    const variables = {
        variables: {
            country,
            from_date,
            to_date
        }
    }

    const { data: datesData } = useQuery(GET_DATES, variables)
    const [getCountryDailyInfo, { loading: dailyLoading, data: dailyData }] = useLazyQuery(GET_COUNTRY_DAILY_INFO);
    const [getCountryTotals, { loading: totalsLoading, data: totalsData }] = useLazyQuery(GET_COUNTRY_TOTALS);

    useEffect(() => {
        getCountryDailyInfo(variables)
        getCountryTotals(variables)
    }, [filters])

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {dailyLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Line
                        className={classes.chart}
                        data={{
                            labels: datesData?.dates,
                            datasets: [
                                generateDatasets('Daily cases', dailyData?.countryDailyInfo.new_confirmed, '#4791db'),
                                generateDatasets('Daily recovered', dailyData?.countryDailyInfo.new_recovered, '#81c784')
                            ]
                        }}
                        options={generateOptions('Last month daily info', 16)}
                    />}
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {dailyLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Bar
                        className={classes.chart}
                        data={{
                            labels: datesData?.dates,
                            datasets: [generateDatasets('Daily deaths', dailyData?.countryDailyInfo.new_deaths, '#e57373')]
                        }}
                        options={generateOptions('Last month daily deaths', 16)}
                    />}
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {totalsLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Line
                        className={classes.chart}
                        data={{
                            labels: datesData?.dates,
                            datasets: [
                                generateDatasets('Total cases', totalsData?.countryTotals.total_confirmed, '#4791db'),
                                generateDatasets('Total recovered', totalsData?.countryTotals.total_recovered, '#81c784'),
                                generateDatasets('Open cases', totalsData?.countryTotals.total_open_cases, '#ffb74d'),
                                generateDatasets('Total deaths', totalsData?.countryTotals.total_deaths, '#e57373')]
                        }}
                        options={generateOptions('Evolution of total numbers', 16)}
                    />}
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                <Percentages />
            </Grid>
        </Grid>
    )
};

export default Charts;