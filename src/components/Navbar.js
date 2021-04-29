import React from 'react';

import { AppBar, Toolbar, Button, Link } from '@material-ui/core';
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
        marginLeft: '0.5em',
        fontSize: '0.875rem',
    }
}));

function Navbar() {
    const classes = useStyles()

    return (
        <AppBar className={classes.root} position='fixed'>
            <Toolbar>
                <Button className={classes.button}>
                    <FlagOutlinedIcon />
                    <Link href='#local-data' className={classes.link}>Covid statistics per Country</Link>
                </Button>
                <Button className={classes.button}>
                    <PublicOutlinedIcon />
                    <Link href='#global-data' className={classes.link}>Global Covid statistics</Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
