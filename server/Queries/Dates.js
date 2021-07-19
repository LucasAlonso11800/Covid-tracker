const axios = require('axios');
const { GraphQLList, GraphQLString } = require('graphql');

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_DATES = {
    type: new GraphQLList(GraphQLString),
    args: {
        country: { type: GraphQLString },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { country, from_date, to_date } = args;
        const data = await (await axios.get(`${initialURL}/country/${country}?date_from=${from_date}&date_to=${to_date}`)).data

        return Object.keys(data.dates); 
    }
};

module.exports = GET_DATES