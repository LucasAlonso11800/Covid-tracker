import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: '1',
        textAlign: 'center',
        margin: '1em 0',
    }
}))

function GlobalTitle() {
    const classes = useStyles();
    return (
        <Typography className={classes.root} variant='h4'>
            Global Data
        </Typography>
    )
}

export default GlobalTitle
