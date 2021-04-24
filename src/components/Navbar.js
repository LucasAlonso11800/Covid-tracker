import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles(() => ({
    root: { 
        flexGrow: 1,
        padding: '0.5em, 1em'
    },
    title: {
        flexGrow: 1
    },
    publicIcon: {
        marginLeft: '1em'
    }
}));

function Navbar() {
    const classes = useStyles()

    return (
        <AppBar
            className={classes.root}
            position='static'
        >
            <Toolbar>
                <Typography
                    className={classes.title}
                    variant='h5'
                >
                    Covid-19 Statistics
                </Typography>
                <PublicIcon 
                    className={classes.publicIcon}
                />
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
