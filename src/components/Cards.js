import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: '1',
        margin: '1em 0'
    },
    gridContainer: {
        flexGrow: '1'
    },
    card: {
        padding: '0.5em 0.25em',
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
}));

function Cards() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid
                container
                className={classes.gridContainer}
                spacing={2}
            >
                <Grid
                    item
                    xs={6}
                    md={3}
                >
                    <Card
                        className={classes.card, classes.firstCard}
                    >
                        <CardContent>
                            <Typography className={classes.cardTitle}>Total cases</Typography>
                            <Typography className={classes.cardData}>2000000</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={3}
                >
                    <Card
                        className={classes.card, classes.secondCard}
                    >
                        <CardContent>
                            <Typography className={classes.cardTitle}>Total deaths</Typography>
                            <Typography className={classes.cardData}>70000</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={3}
                >
                    <Card
                        className={classes.card, classes.thirdCard}
                    >
                        <CardContent>
                            <Typography className={classes.cardTitle}>Today recovered</Typography>
                            <Typography className={classes.cardData}>20193</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={3}
                >
                    <Card
                        className={classes.card, classes.fourthCard}
                    >
                        <CardContent>
                            <Typography className={classes.cardTitle}>Open cases</Typography>
                            <Typography className={classes.cardData}>20902</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
