import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Charts from './Charts'
import Cards from './Cards';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em'
    },
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

function Dashboard() {
    const currentDate = new Date();

    const [date, setDate] = useState(currentDate);
    const [country, setCountry] = useState('Argentina');
    const [countries, setCountries] = useState([]);
    const [dates, setDates] = useState([]);
    const [cases, setCases] = useState([]);
    const [recovered, setRecovered] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [totalCases, setTotalCases] = useState([]);
    const [totalRecovered, setTotalRecovered] = useState([]);
    const [openCases, setOpenCases] = useState([]);
    const [totalDeaths, setTotalDeaths] = useState([]);
    const [firstChartData, setFirstChartData] = useState([]);
    const [secondChartData, setSecondChartData] = useState([]);
    const [thirdChartData, setThirdChartData] = useState([]);

    const [isLoading, setIsLoading] = useState()

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    function dateToString(date) {
        return date.toISOString().substring(0, 10)
    };

    // GET COUNTRY LIST
    useEffect(() => {
        axios.get(`${initialURL}/${dateToString(currentDate)}`)
            .then(res => setCountries(Object.keys(res.data.dates[dateToString(currentDate)].countries)))
            .catch(err => console.log(err))
    }, []);

    // GET DATA
    useEffect(() => {
        setIsLoading(true)

        const secondDate = new Date(date.valueOf());
        secondDate.setMonth(date.getMonth() - 1);

        axios.get(`${initialURL}/country/${country.toLowerCase()}?date_from=${dateToString(secondDate)}&date_to=${dateToString(date)}`)
            .then(res => {
                setDates(Object.keys(res.data.dates));
                const data = Object.values(res.data.dates);

                const newCases = [];
                const newRecovered = [];
                const newDeaths = [];
                const newTotalCases = [];
                const newTotalRecovered = [];
                const newOpenCases = [];
                const newTotalDeaths = [];

                data.forEach(d => {
                    newCases.push(d.countries[country].today_new_confirmed);
                    newRecovered.push(d.countries[country].today_new_recovered);
                    newDeaths.push(d.countries[country].today_new_deaths);
                    newTotalCases.push(d.countries[country].today_confirmed);
                    newTotalRecovered.push(d.countries[country].today_recovered);
                    newOpenCases.push(d.countries[country].today_open_cases);
                    newTotalDeaths.push(d.countries[country].today_deaths);
                });

                setCases(newCases);
                setRecovered(newRecovered);
                setDeaths(newDeaths);
                setTotalCases(newTotalCases);
                setTotalRecovered(newTotalRecovered);
                setOpenCases(newOpenCases);
                setTotalDeaths(newTotalDeaths);
            })
            .catch(err => console.log(err));
    }, [date, country]);

    // CREATE CHARTS
    useEffect(() => {
        setFirstChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Daily cases',
                    data: cases,
                    fill: true,
                    borderColor: 'rgb(70, 80, 250)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Daily recovered',
                    data: recovered,
                    fill: true,
                    borderColor: 'rgb(70, 230, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                }]
        })
        setSecondChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Daily deaths',
                    data: deaths,
                    fill: true,
                    borderColor: 'rgb(70, 230, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                }]
        })
        setThirdChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Total cases',
                    data: totalCases,
                    fill: true,
                    borderColor: 'rgb(70, 30, 270)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Total recovered',
                    data: totalRecovered,
                    fill: true,
                    borderColor: 'rgb(70, 230, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Open cases',
                    data: openCases,
                    fill: true,
                    borderColor: 'rgb(270, 20, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Total deaths',
                    data: totalDeaths,
                    fill: true,
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                }
            ]
        })
        setIsLoading(false)
    }, [openCases])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl
                className={classes.form}
            >
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
                    onChange={e => setDate(new Date(e.target.value))}
                />
            </FormControl>
            <Cards 
                totalCases={totalCases[totalCases.length - 1]}
                totalDeaths={totalDeaths[totalDeaths.length - 1]}
                totalRecovered={totalRecovered[totalRecovered.length - 1]}
                openCases={openCases[openCases.length - 1]}
                date={dates[dates.length - 1]}
            />
            <Charts
                firstChartData={firstChartData}
                secondChartData={secondChartData}
                thirdChartData={thirdChartData}
                isLoading={isLoading}
            />
        </div>
    )
};

export default Dashboard;