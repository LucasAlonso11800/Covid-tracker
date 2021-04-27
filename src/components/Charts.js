import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
    gridContainer: {
        flexGrow: 1,
        padding: '0.5em 0',
    },
    gridItem: {
        height: '50vh',
        padding: '0.5em',
        border: '2px solid #000000',
        margin: '0.5em 0'
    }
}));

function Charts({ firstChartData, secondChartData, thirdChartData, fourthChartData }) {
    const classes = useStyles()

    return (
        <Grid
            container
            className={classes.gridContainer}
            justify='space-around'
            alignItems='center'
        >
            <Grid
                className={classes.gridItem}
                item
                xs={10}
                sm={5}
            >
                <Line
                    className='chart'
                    data={firstChartData}
                    options={{
                        maintainAspectRatio: false,

                    }}
                />
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={10}
                sm={5}
            >
                <Bar
                    className='chart'
                    data={secondChartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={10}
                sm={5}
            >
                <Line
                    className='chart'
                    data={thirdChartData}
                    options={{
                        maintainAspectRatio: false,

                    }}
                />
            </Grid>
            <Grid
                className={classes.gridItem}
                item
                xs={10}
                sm={5}
            >
                <Bar
                    className='chart'
                    data={fourthChartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </Grid>
        </Grid>
    )
};

export default Charts
