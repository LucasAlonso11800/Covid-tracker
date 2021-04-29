import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { Bar, Line, } from 'react-chartjs-2';

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

function Charts({ firstChartData, secondChartData, thirdChartData, increaseCases, increaseDeaths, increaseOpenCases, increaseRecovered, isLoading }) {
    const classes = useStyles()

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {isLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Line
                        className={classes.chart}
                        data={firstChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Last month daily info',
                                    position: 'top',
                                    align: 'start',
                                    color: '#000000',
                                    font: {
                                        size: 16,
                                    }
                                }
                            }
                        }}
                    />
                }
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {isLoading ?
                <CircularProgress className={classes.progress} /> :
                <Bar
                    className={classes.chart}
                    data={secondChartData}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Last month daily deaths',
                                position: 'top',
                                align: 'start',
                                color: '#000000',
                                font: {
                                    size: 16
                                },
                            }
                        }
                    }}
                />
                }
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {isLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Line
                        className={classes.chart}
                        data={thirdChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Evolution of total numbers',
                                    position: 'top',
                                    align: 'start',
                                    color: '#000000',
                                    font: {
                                        size: 16
                                    }
                                }
                            }
                        }}
                    />
                }
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={6}>
                {isLoading ?
                    <CircularProgress className={classes.progress} /> :
                    <Percentages
                        increaseCases={increaseCases}
                        increaseDeaths={increaseDeaths}
                        increaseOpenCases={increaseOpenCases}
                        increaseRecovered={increaseRecovered}
                        isLoading={isLoading}
                    />
                }
            </Grid>
        </Grid>
    )
};

export default Charts
