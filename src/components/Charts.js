import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { Bar, Line, } from 'react-chartjs-2';

import Percentages from './Percentages';

const useStyles = makeStyles(() => ({
    gridContainer: {
        flexGrow: 1,
        margin: '1em 0',
    },
    gridItem: {
        height: '50vh',
        padding: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function Charts({ firstChartData, secondChartData, thirdChartData, increaseCases, increaseDeaths, increaseOpenCases, increaseRecovered, isLoading }) {
    const classes = useStyles()

    return (
        <Grid
            container
            className={classes.gridContainer}
            alignItems='center'
        >
            <Grid
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
            >
                {isLoading ?
                    <CircularProgress /> :
                    <Line
                        className='chart'
                        data={firstChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Last month daily info',
                                    position: 'top',
                                    align: 'start',
                                    font: {
                                        size: 14
                                    }
                                }
                            }
                        }}
                    />
                }
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
            >{isLoading ?
                <CircularProgress /> :
                <Bar
                    className='chart'
                    data={secondChartData}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Last month daily deaths',
                                position: 'top',
                                align: 'start',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }}
                />
                }
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
            >
                {isLoading ?
                    <CircularProgress /> :
                    <Line
                        className='chart'
                        data={thirdChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Evolution of total numbers',
                                    position: 'top',
                                    align: 'start',
                                    font: {
                                        size: 14
                                    }
                                }
                            }
                        }}
                    />
                }
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
            >
                {isLoading ?
                    <CircularProgress /> :
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
