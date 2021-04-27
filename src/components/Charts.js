import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
    gridContainer: {
        flexGrow: 1,
        margin: '1em 0',
    },
    gridItem: {
        height: '50vh',
        padding: '0.5em',
        boxShadow: '0 0 5px 1px'
    }
}));

function Charts({ firstChartData, secondChartData, thirdChartData, fourthChartData }) {
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
                xs={10}
                sm={6}
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
                sm={6}
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
                sm={6}
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
                sm={6}
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
