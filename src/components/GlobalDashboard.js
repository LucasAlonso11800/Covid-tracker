import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './Form';
import Cards from './Cards';
import Charts from './Charts';

function GlobalDashboard() {
    const currentDate = new Date();

    const [date, setDate] = useState(currentDate);
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

    const [isLoading, setIsLoading] = useState(false);

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    function dateToString(date) {
        return date.toISOString().substring(0, 10)
    };

    useEffect(() => {
        const secondDate = new Date(date.valueOf());
        secondDate.setDate(date.getDate() - 20);

        axios.get(`${initialURL}?date_from=${dateToString(secondDate)}&date_to=${dateToString(date)}`)
            .then(res => {
                setDates(Object.keys(res.data.dates));

                setTotalCases(res.data.total.today_confirmed);
                setTotalDeaths(res.data.total.today_deaths);
                setTotalRecovered(res.data.total.today_recovered);
                setOpenCases(res.data.total.today_open_cases);
            })
            .catch(err => console.log(err))

    }, [date]);

    return (
        <>
            <Cards 
                totalCases={totalCases}
                totalDeaths={totalDeaths}
                totalRecovered={totalRecovered}
                openCases={openCases}
                date={dates[dates.length - 1]}
                isLoading={isLoading}
            />
            {/* <Form />
            <Charts /> */}
        </>
    )
};

export default GlobalDashboard;
