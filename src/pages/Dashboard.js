import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from '../components/Form';
import Cards from '../components/Cards';
import Charts from '../components/Charts';
import GlobalTitle from '../components/GlobalTitle';
import GlobalCharts from '../components/GlobalCharts';

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
    const [globalChartData, setGlobalChartData] = useState([]);
    const [increaseCases, setIncreaseCases] = useState('');
    const [increaseDeaths, setIncreaseDeaths] = useState('');
    const [increaseOpenCases, setIncreaseOpenCases] = useState('');
    const [increaseRecovered, setIncreaseRecovered] = useState('');
    const [globalCases, setGlobalCases] = useState('');
    const [globalRecovered, setGlobalRecovered] = useState('');
    const [globalOpenCases, setGlobalOpenCases] = useState('');
    const [globalDeaths, setGlobalDeaths] = useState('');

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

        setCases([]);
        setRecovered([]);
        setDeaths([]);
        setTotalCases([]);
        setTotalRecovered([]);
        setOpenCases([]);
        setTotalDeaths([]);

        const from = new Date(date.valueOf());
        from.setDate(date.getDate() - 1);
        from.setMonth(date.getMonth() - 1);

        const to = new Date(date.valueOf());
        to.setDate(date.getDate() - 1);

        axios.get(`${initialURL}/country/${country.toLowerCase()}?date_from=${dateToString(from)}&date_to=${dateToString(to)}`)
            .then(res => {
                setDates(Object.keys(res.data.dates));
                const data = Object.values(res.data.dates);

                data.forEach(d => {
                    const currentCountry = d.countries[country]

                    setCases(arr => [...arr, currentCountry.today_new_confirmed]);
                    setRecovered(arr => [...arr, currentCountry.today_new_recovered]);
                    setDeaths(arr => [...arr, currentCountry.today_new_deaths]);
                    setTotalCases(arr => [...arr, currentCountry.today_confirmed]);
                    setTotalRecovered(arr => [...arr, currentCountry.today_recovered]);
                    setOpenCases(arr => [...arr, currentCountry.today_open_cases]);
                    setTotalDeaths(arr => [...arr, currentCountry.today_deaths]);
                });

                const increase = data[data.length - 1].countries[country];
                setIncreaseCases(increase.today_vs_yesterday_confirmed);
                setIncreaseDeaths(increase.today_vs_yesterday_deaths);
                setIncreaseOpenCases(increase.today_vs_yesterday_open_cases);
                setIncreaseRecovered(increase.today_vs_yesterday_recovered);

                const global = res.data.total
                setGlobalCases(global.today_confirmed);
                setGlobalDeaths(global.today_deaths);
                setGlobalRecovered(global.today_recovered);
                setGlobalOpenCases(global.today_open_cases);

                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [date, country]);

    // GENERATE DATASETS FUNCTIONS
    function generateDatasets(label, data, border) {
        return ({
            label: label,
            data: data,
            fill: true,
            borderColor: border,
            borderWidth: 2,
            pointHitRadius: 10,
            tension: 0.2
        })
    };

    // CREATE CHARTS
    useEffect(() => {
        setFirstChartData({
            labels: dates,
            datasets: [
                generateDatasets('Daily cases', cases, '#4791db'),
                generateDatasets('Daily recovered', recovered, '#81c784'),]
        })
        setSecondChartData({
            labels: dates,
            datasets: [generateDatasets('Daily deaths', deaths, '#e57373')]
        })
        setThirdChartData({
            labels: dates,
            datasets: [
                generateDatasets('Total cases', totalCases, '#4791db'),
                generateDatasets('Total recovered', totalRecovered, '#81c784'),
                generateDatasets('Open cases', openCases, '#ffb74d'),
                generateDatasets('Total deaths', totalDeaths, '#e57373')]
        })
        setGlobalChartData({
            labels: ['Total cases', 'Recovered people', 'Open cases', 'Deaths'],
            datasets: [
                {
                    label: dateToString(date),
                    data: [globalCases, globalRecovered, globalOpenCases, globalDeaths],
                    fill: true,
                    backgroundColor: ['#4791db', '#81c784', '#ffb74d', '#e57373'],
                    hoverOffset: 2,
                    indexAxis: 'y'
                }
            ]
        })
    }, [isLoading])

    return (
        <>
            <Form
                country={country}
                setCountry={setCountry}
                countries={countries}
                date={dateToString(date)}
                setDate={setDate}
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
                country={country}
                isLoading={isLoading}
            />
            <GlobalTitle />
            <GlobalCharts
                globalChartData={globalChartData}
                isLoading={isLoading}
            />
        </>
    )
};

export default Dashboard;