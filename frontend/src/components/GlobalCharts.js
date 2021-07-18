import React, { useContext } from 'react';
import { GlobalContext } from '../Context';
import { generateOptions } from '../functions';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_DATA } from '../GraphQL/Queries';

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
        padding: '0.5em 1em',
        borderRadius: '1em',
        boxShadow: '0 0 5px 0'
    }
}));

function GlobalCharts() {
    const classes = useStyles();
    const [{ today }, setFilters] = useContext(GlobalContext);
    const { loading, data } = useQuery(GET_GLOBAL_DATA, {
        variables: { date: today }
    });
    
    return (
        <Grid container className={classes.gridContainer}>
            <Grid item className={classes.gridItem} xs={12}>
                {loading ?
                    <CircularProgress className={classes.progress} /> :
                    <Bar
                        id='global-data'
                        className={classes.chart}
                        data={{
                            labels: ['Total cases', 'Recovered people', 'Open cases', 'Deaths'],
                            datasets: [{
                                label: today,
                                data: [
                                    data.globalData.today_confirmed,
                                    data.globalData.today_recovered,
                                    data.globalData.today_open_cases,
                                    data.globalData.today_deaths
                                ],
                                fill: true,
                                backgroundColor: ['#4791db', '#81c784', '#ffb74d', '#e57373'],
                                hoverOffset: 2,
                                indexAxis: 'y'
                            }]
                        }}
                        options={generateOptions('Current status of the pandemic worldwide', 18)}
                    />}
            </Grid>
        </Grid>
    )
};

export default GlobalCharts;
