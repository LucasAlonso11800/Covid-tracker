const axios = require('axios');
const { GraphQLString } = require('graphql');
const { CountryDailyIncreaseType } = require('../Types');

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_COUNTRY_DAILY_INCREASE = {
    type: CountryDailyIncreaseType,
    args: {
        country: { type: GraphQLString },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { country, from_date, to_date } = args;
        const data = await (await axios.get(`${initialURL}/country/${country}?date_from=${from_date}&date_to=${to_date}`)).data

        const values = Object.values(data.dates);
        const increase = values[values.length - 1].countries[country]

        const response = {
            confirmed_increase: getPercentage(increase.today_vs_yesterday_confirmed),
            recovered_increase: getPercentage(increase.today_vs_yesterday_recovered),
            open_cases_increase: getPercentage(increase.today_vs_yesterday_open_cases),
            deaths_increase: getPercentage(increase.today_vs_yesterday_deaths),
        };

        return response
    }
};

function getPercentage(data) {
    return parseFloat((data * 100).toFixed(2))
};

module.exports = GET_COUNTRY_DAILY_INCREASE