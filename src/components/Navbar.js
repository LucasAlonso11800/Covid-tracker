import React from 'react';

import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: '0.5em, 1em'
    },
    button: {
        padding: '1.25em 0.5em'
    },
    link: {
        color: '#ffffff',
        textDecoration: 'none',
        marginLeft: '0.5em'
    }
}));

function Navbar() {
    const classes = useStyles()

    return (
        <AppBar className={classes.root} position='static'>
            <Toolbar>
                <Button className={classes.button}>
                    <PublicOutlinedIcon />
                    <Link to='/' className={classes.link}>Global Covid statistics</Link>
                </Button>
                <Button className={classes.button}>
                    <FlagOutlinedIcon />
                    <Link to='/local' className={classes.link}>Covid statistics per Country</Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
