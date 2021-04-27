import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
    text: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: '0.5em'
    },
    gridContainer: {
        flexGrow: 1,
        padding: '0.5em 0',
    },
    gridItem: {
        height: '50vh',
        padding: '0.5em',
        border: '2px solid #000000',
        margin: '0.5em 0'
    }
}));

function Dashboard() {
    const currentDate = new Date();

    const [date, setDate] = useState();
    const [country, setCountry] = useState('');
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
    const [fourthChartData, setFourthChartData] = useState([]);

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    // GET COUNTRY LIST
    useEffect(() => {
        const today = currentDate.toISOString().substring(0, 10);
        axios.get(`${initialURL}/${today}`)
            .then(res => setCountries(Object.keys(res.data.dates[today].countries)))
            .catch(err => console.log(err))
    }, []);
    // GET DATA
    useEffect(() => {
        const secondDate = new Date();
        secondDate.setMonth(date.getMonth() - 1);
        const previousDate = secondDate.toISOString().substring(0, 10);

        axios.get(`${initialURL}/country/${country.toLowerCase()}?date_from=${previousDate}&date_to=${date.toISOString().substring(0, 10)}`)
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
    // FIRST CHART
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
    }, [dates, cases, recovered])
    // SECOND CHART
    useEffect(() => {
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
    }, [dates, deaths])
    // THIRD CHART
    useEffect(() => {
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
                    label: 'Total open cases',
                    data: openCases,
                    fill: true,
                    borderColor: 'rgb(270, 20, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
            ]
        })
    }, [dates, totalCases, totalRecovered, openCases]);
    // FOURTH CHART
    useEffect(() => {
        setFourthChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Total deaths',
                    data: totalDeaths,
                    fill: true,
                    borderColor: 'rgb(70, 230, 70)',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                }]
        })
    }, [dates, totalDeaths])

    const classes = useStyles();

    return (
        <div className="background">
            <FormControl>
                <Select
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
                <InputLabel htmlFor='date'>Select a date</InputLabel>
                <TextField
                    id='date'
                    type='date'
                    onChange={e => setDate(new Date(e.target.value))}
                />
                {/* <Button onClick={() => getData()}>
                    Get data
                    </Button> */}
            </FormControl>

            <Grid
                container
                className={classes.gridContainer}
                justify='space-around'
                alignItems='center'
            >
                <Grid
                    className={classes.gridItem}
                    item
                    xs={10}
                    sm={5}
                >
                    <Line
                        className='chart'
                        data={firstChartData}
                        options={{
                            maintainAspectRatio: false,

                        }}
                    />
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={10}
                    sm={5}
                >
                    <Bar
                        className='chart'
                        data={secondChartData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={10}
                    sm={5}
                >
                    <Line
                        className='chart'
                        data={thirdChartData}
                        options={{
                            maintainAspectRatio: false,

                        }}
                    />
                </Grid>
                <Grid
                    className={classes.gridItem}
                    item
                    xs={10}
                    sm={5}
                >
                    <Bar
                        className='chart'
                        data={fourthChartData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
};

export default Dashboard;