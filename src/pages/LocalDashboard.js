import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from '../components/Form';
import Cards from '../components/Cards';
import Charts from '../components/Charts';

function LocalDashboard() {
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
    const [increaseCases, setIncreaseCases] = useState('');
    const [increaseDeaths, setIncreaseDeaths] = useState('');
    const [increaseOpenCases, setIncreaseOpenCases] = useState('');
    const [increaseRecovered, setIncreaseRecovered] = useState('');

    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);

        const from = new Date(date.valueOf());
        from.setDate(date.getDate() - 1);
        from.setMonth(date.getMonth() - 1);

        const to = new Date(date.valueOf());
        to.setDate(date.getDate() - 1);

        axios.get(`${initialURL}/country/${country.toLowerCase()}?date_from=${dateToString(from)}&date_to=${dateToString(to)}`)
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

                setIncreaseCases(data[data.length - 1].countries[country].today_vs_yesterday_confirmed);
                setIncreaseDeaths(data[data.length - 1].countries[country].today_vs_yesterday_deaths);
                setIncreaseOpenCases(data[data.length - 1].countries[country].today_vs_yesterday_open_cases);
                setIncreaseRecovered(data[data.length - 1].countries[country].today_vs_yesterday_recovered);

                setIsLoading(false);
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
                    borderColor: '#4791db',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Daily recovered',
                    data: recovered,
                    fill: true,
                    borderColor: '#81c784',
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
                    borderColor: '#e57373',
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
                    borderColor: '#4791db',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Total recovered',
                    data: totalRecovered,
                    fill: true,
                    borderColor: '#81c784',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Open cases',
                    data: openCases,
                    fill: true,
                    borderColor: '#ffb74d',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                },
                {
                    label: 'Total deaths',
                    data: totalDeaths,
                    fill: true,
                    borderColor: '#e57373',
                    borderWidth: 2,
                    pointHitRadius: 10,
                    tension: 0.2
                }
            ]
        })
    }, [totalDeaths])

    return (
        <>
            <Form
                country={country}
                setCountry={setCountry}
                countries={countries}
                date={dateToString(date)}
                setDate={setDate}
                local={true}
            />
            <Cards
                totalCases={totalCases[totalCases.length - 1]}
                totalDeaths={totalDeaths[totalDeaths.length - 1]}
                totalRecovered={totalRecovered[totalRecovered.length - 1]}
                openCases={openCases[openCases.length - 1]}
                date={dates[dates.length - 1]}
                isLoading={isLoading}
            />
            <Charts
                firstChartData={firstChartData}
                secondChartData={secondChartData}
                thirdChartData={thirdChartData}
                increaseCases={increaseCases}
                increaseDeaths={increaseDeaths}
                increaseOpenCases={increaseOpenCases}
                increaseRecovered={increaseRecovered}
                isLoading={isLoading}
            />
        </>
    )
};

export default LocalDashboard;