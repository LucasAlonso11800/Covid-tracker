import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, TextField } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: '0 1.25em'
    },
    formItem: {
        width: '45%'
    }
}));

function Form({ country, setCountry, countries, date, setDate }) {
    const classes = useStyles();

    return (
        <FormControl className={classes.form} id='local-data'>
            <Select
                className={classes.formItem}
                value={country}
                onChange={e => setCountry(e.target.value)}
            >
                {countries.map(c => {
                    return <MenuItem
                        key={c}
                        value={c}
                    >
                        {c}
                    </MenuItem>
                })}
            </Select>
            <TextField
                className={classes.formItem}
                type='date'
                value={date}
                onChange={e => setDate(new Date(e.target.value))}
            />
        </FormControl>
    )
}

export default Form
