const axios = require('axios');
const { GraphQLString } = require('graphql');
const { CountryTotalsType } = require('../Types');

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_COUNTRY_TOTALS = {
    type: CountryTotalsType,
    args: {
        country: { type: GraphQLString },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { country, from_date, to_date } = args;
        const data = await (await axios.get(`${initialURL}/country/${country}?date_from=${from_date}&date_to=${to_date}`)).data

        const response = {
            total_confirmed: [],
            total_deaths: [],
            total_recovered: [],
            total_open_cases: [],
        }

        const values = Object.values(data.dates);
        
        values.map(date => {
            const currentCountry = date.countries[country];
            response.total_confirmed.push(currentCountry.today_confirmed);
            response.total_deaths.push(currentCountry.today_deaths);
            response.total_recovered.push(currentCountry.today_recovered);
            response.total_open_cases.push(currentCountry.today_open_cases);
        })

        return response
    }
};

module.exports = GET_COUNTRY_TOTALS