const axios = require('axios');
const { GraphQLList, GraphQLString } = require('graphql');

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_COUNTRIES = {
    type: new GraphQLList(GraphQLString),
    args: {
        date: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const data = await (await axios.get(`${initialURL}/${args.date}`)).data
        return Object.keys(data.dates[args.date].countries); 
    }
};

module.exports = GET_COUNTRIES