import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

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

function GlobalCharts({ globalChartData, isLoading }) {
    const classes = useStyles();
    return (
        <Grid container className={classes.gridContainer}>
            <Grid item className={classes.gridItem} xs={12}>
                {isLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Bar
                        id='global-data'
                        className={classes.chart}
                        data={globalChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Current status of the pandemic worldwide',
                                    position: 'top',
                                    align: 'start',
                                    color: '#000000',
                                    font: {
                                        size: 18
                                    }
                                }
                            }
                        }}
                    />
                }
            </Grid>
        </Grid>
    )
};

export default GlobalCharts;
