import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 1.25em'
    },
    formItem: {
        width: '40%'
    },
    button: {
        width: "10%",
        height: "2rem",
        color: "#ffffff",
        background: theme.palette.primary.main,
        borderRadius: 21,
        fontWeight: 400,
        "&:hover": {
            background: theme.palette.primary.main
        }
    }
}));

function Form({ countries, setFilters }) {
    const classes = useStyles();

    const validationSchema = yup.object({
        country: yup.string().required('Choose an option'),
        date: yup
            .string()
            .test("presentDate", "Select a past or present date", validatePresentDate)
            .test("pandemicTimes", "Select a date after 01/04/2020", validatePandemicDate)
            .required('Choose a date')
    });

    const formik = useFormik({
        initialValues: {
            country: 'Argentina',
            date: new Date().toISOString().substring(0, 10)
        },
        validationSchema: validationSchema,
        onSubmit: (values) => setFilters(values)
    });

    function validatePresentDate() {
        const date = new Date(Date.now()).toISOString().substring(0, 10)
        const currentYear = parseInt(date.substring(0, 4))
        const currentMonth = parseInt(date.substring(5, 7))
        const currentDay = parseInt(date.substring(8))
        const year = parseInt(formik.values.date.substring(0, 4))
        const month = parseInt(formik.values.date.substring(5, 7))
        const day = parseInt(formik.values.date.substring(8))

        if (year > currentYear) return false
        if (year === currentYear) {
            if (month > currentMonth) return false
            if (month === currentMonth) {
                if (day > currentDay) return false
                return true
            }
            return true
        }
        return true
    };

    function validatePandemicDate() {
        const date = "2020-04-01"
        const initialYear = parseInt(date.substring(0, 4))
        const initialMonth = parseInt(date.substring(5, 7))
        const initialDay = parseInt(date.substring(8))
        const year = parseInt(formik.values.date.substring(0, 4))
        const month = parseInt(formik.values.date.substring(5, 7))
        const day = parseInt(formik.values.date.substring(8))

        if (year < initialYear) return false
        if (year === initialYear) {
            if (month < initialMonth) return false
            if (month === initialMonth) {
                if (day < initialDay) return false
                return true
            }
            return true
        }
        return true
    };

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
                label='Country'
                name='country'
                select
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
                className={classes.formItem}
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
            >
                {countries.map(c => {
                    return <option
                        key={c}
                        value={c}
                    >
                        {c}
                    </option>
                })}
            </TextField>
            <TextField
                label='Date'
                name='date'
                type="date"
                className={classes.formItem}
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />
            <Button
                type="submit"
                className={classes.button}
            >
                Get data
            </Button>
        </form>
    )
}

export default Form
