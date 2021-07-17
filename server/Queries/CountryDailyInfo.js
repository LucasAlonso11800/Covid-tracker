const axios = require('axios');
const { GraphQLString } = require('graphql');
const { CountryDailyInfoType } = require('../Types');

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_COUNTRY_DAILY_INFO = {
    type: CountryDailyInfoType,
    args: {
        country: { type: GraphQLString },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { country, from_date, to_date } = args;
        const data = await (await axios.get(`${initialURL}/country/${country}?date_from=${from_date}&date_to=${to_date}`)).data

        const response = {
            today_new_confirmed: [],
            today_new_deaths: [],
            today_new_recovered: [],
        }

        const values = Object.values(data.dates);
        
        values.map(date => {
            const currentCountry = date.countries[country];
            response.today_new_confirmed.push(currentCountry.today_new_confirmed);
            response.today_new_recovered.push(currentCountry.today_new_recovered);
            response.today_new_deaths.push(currentCountry.today_new_deaths);
        })

        return response
    }
};

module.exports = GET_COUNTRY_DAILY_INFO