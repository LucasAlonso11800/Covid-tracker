import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { dateToString, generateDatasets } from '../functions';

import Form from '../components/Form';
import Cards from '../components/Cards';
import Charts from '../components/Charts';
import GlobalTitle from '../components/GlobalTitle';
import GlobalCharts from '../components/GlobalCharts';

function Dashboard() {
    const currentDate = useRef(new Date());

    const [date, setDate] = useState(currentDate.current);
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
    const [globalChartData, setGlobalChartData] = useState([]);

    const [increaseData, setIncreaseData] = useState({})
    const [globalData, setGlobalData] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    // GET COUNTRY LIST
    useEffect(() => {
        (async () => {
            try {
                const data = await (await axios.get(`${initialURL}/${dateToString(currentDate.current)}`)).data
                setCountries(Object.keys(data.dates[dateToString(currentDate.current)].countries));
                setGlobalData({
                    cases: data.total.today_confirmed,
                    recovered: data.total.today_recovered,
                    openCases: data.total.today_open_cases,
                    deaths: data.total.today_deaths
                });
                setCountry('Argentina')
                console.log(data)
            }
            catch (err) {
                console.log(err)
            }
        })()
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

        (async () => {
            try {
                const info = await (await axios.get(`${initialURL}/country/${country.toLowerCase()}?date_from=${dateToString(from)}&date_to=${dateToString(to)}`)).data
                setDates(Object.keys(info.dates));
                const data = Object.values(info.dates);

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
                setIncreaseData({
                    cases: increase.today_vs_yesterday_confirmed,
                    recovered: increase.today_vs_yesterday_recovered,
                    openCases: increase.today_vs_yesterday_open_cases,
                    deaths: increase.today_vs_yesterday_deaths
                });

                setIsLoading(false);
            }
            catch (err) {
                console.log(err)
            }
        })();
    }, [date, country]);

    // CREATE CHARTS
    useEffect(() => {
        setFirstChartData({
            labels: dates,
            datasets: [
                generateDatasets('Daily cases', cases, '#4791db'),
                generateDatasets('Daily recovered', recovered, '#81c784')]
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
            datasets: [{
                label: dateToString(date),
                data: [globalData.cases, globalData.recovered, globalData.openCases, globalData.deaths],
                fill: true,
                backgroundColor: ['#4791db', '#81c784', '#ffb74d', '#e57373'],
                hoverOffset: 2,
                indexAxis: 'y'
            }]
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
                increaseData={increaseData}
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