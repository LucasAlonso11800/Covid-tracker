import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        flexGrow: 1,
    },
    gridItem: {

    },
    card: {
        padding: '0.5em 0.25em',
        flexGrow: 1
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
    }
}));

function Percentages() {
    const classes = useStyles()

    return (
        <Grid
            className={classes.gridContainer}
            container
            spacing={2}
        >
            <Grid
                xs={4}
                sm={12}
            >
                <Card
                    className={classes.card, classes.firstCard}
                >
                    <CardContent>
                        <Typography className={classes.cardTitle}>Total cases</Typography>
                        <Typography className={classes.cardData}>20%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                xs={4}
                sm={12}
            >
                <Card
                    className={classes.card, classes.secondCard}
                >
                    <CardContent>
                        <Typography className={classes.cardTitle}>Total cases</Typography>
                        <Typography className={classes.cardData}>20%</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                xs={4}
                sm={12}
            >
                <Card
                    className={classes.card, classes.thirdCard}
                >
                    <CardContent>
                        <Typography className={classes.cardTitle}>Total cases</Typography>
                        <Typography className={classes.cardData}>20%</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Percentages
