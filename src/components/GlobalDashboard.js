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

    const [isLoading, setIsLoading] = useState(true);

    const initialURL = 'https://api.covid19tracking.narrativa.com/api';

    function dateToString(date) {
        return date.toISOString().substring(0, 10)
    };

    useEffect(() => {
        setIsLoading(true);

        const secondDate = new Date(date.valueOf());
        secondDate.setDate(date.getDate() - 20);

        axios.get(`${initialURL}?date_from=${dateToString(secondDate)}&date_to=${dateToString(date)}`)
            .then(res => {
                console.log(res.data)
                setDates(Object.keys(res.data.dates));

                setTotalCases(res.data.total.today_confirmed);
                setTotalDeaths(res.data.total.today_deaths);
                setTotalRecovered(res.data.total.today_recovered);
                setOpenCases(res.data.total.today_open_cases);

                setIncreaseCases(res.data.total.today_vs_yesterday_confirmed);
                setIncreaseDeaths(res.data.total.today_vs_yesterday_deaths);
                setIncreaseRecovered(res.data.total.today_vs_yesterday_recovered);
                setIncreaseOpenCases(res.data.total.today_vs_yesterday_open_cases);

                setIsLoading(false);
            })
            .catch(err => console.log(err))

    }, [date]);

    return (
        <>
            <Form
                date={dateToString(date)}
                setDate={setDate}
                local={false}
            />            
            <Cards
                totalCases={totalCases}
                totalDeaths={totalDeaths}
                totalRecovered={totalRecovered}
                openCases={openCases}
                date={dates[dates.length - 1]}
                isLoading={isLoading}
            />
            <Charts
                firstChartData={firstChartData}
                secondChartData={secondChartData}
                thirdChartData={thirdChartData}
                increaseCases={increaseCases}
                increaseDeaths={increaseDeaths}
                increaseRecovered={increaseRecovered}
                increaseOpenCases={increaseOpenCases}
                isLoading={isLoading}
            />
        </>
    )
};

export default GlobalDashboard;
