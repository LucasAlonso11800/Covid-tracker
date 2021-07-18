import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { dateToString, generateDatasets } from '../functions';
import { makeStyles } from '@material-ui/core/styles';
import Form from '../components/Form';
import Cards from '../components/Cards';
import Charts from '../components/Charts';
import GlobalTitle from '../components/GlobalTitle';
import GlobalCharts from '../components/GlobalCharts';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em 1em',
        background: 'linear-gradient(to right, #aaa, #ddd 50%, #aaa)'
    }
}));

function Dashboard() {
    const classes = useStyles()
    const currentDate = useRef(new Date());

    const [date, setDate] = useState(currentDate.current);
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

    const [isLoading, setIsLoading] = useState(true);

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    // GET COUNTRY LIST
    useEffect(() => {
        (async () => {
            try {
                const data = await (await axios.get(`${initialURL}/${dateToString(currentDate.current)}`)).data
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
                const info = await (await axios.get(`${initialURL}/country/Argentina?date_from=${dateToString(from)}&date_to=${dateToString(to)}`)).data
                setDates(Object.keys(info.dates));
                const data = Object.values(info.dates);

                data.forEach(d => {
                    const currentCountry = d.countries['Argentina']

                    setCases(arr => [...arr, currentCountry.today_new_confirmed]);
                    setRecovered(arr => [...arr, currentCountry.today_new_recovered]);
                    setDeaths(arr => [...arr, currentCountry.today_new_deaths]);
                    setTotalCases(arr => [...arr, currentCountry.today_confirmed]);
                    setTotalRecovered(arr => [...arr, currentCountry.today_recovered]);
                    setOpenCases(arr => [...arr, currentCountry.today_open_cases]);
                    setTotalDeaths(arr => [...arr, currentCountry.today_deaths]);
                });

                setIsLoading(false);
            }
            catch (err) {
                console.log(err)
            }
        })();
    }, [date]);

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
    }, [isLoading])

    return (
        <div className={classes.root}>
            <Form />
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
                country={'Argentina'}
                isLoading={isLoading}
            />
            <GlobalTitle />
            <GlobalCharts />
        </div>
    )
};

export default Dashboard;