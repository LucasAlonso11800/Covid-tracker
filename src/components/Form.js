import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, TextField } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between'
    },
    formItem: {
        width: '45%'
    }
}));

function Form({ country, setCountry, countries, date, setDate, local }) {
    const classes = useStyles();

    return (
        <FormControl className={classes.form}>
            {local ?
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
                </Select> :
                <></>
            }
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
