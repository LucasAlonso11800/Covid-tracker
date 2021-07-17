const axios = require('axios');
const { GraphQLString } = require('graphql');
const { GlobalDataType } = require('../Types')

const initialURL = 'https://api.covid19tracking.narrativa.com/api';

const GET_GLOBAL_DATA = {
    type: GlobalDataType,
    args: {
        date: { type: GraphQLString }
    },
    async resolve(parent, args){
        const data = await (await axios.get(`${initialURL}/${args.date}`)).data
        console.log(args)
        return data.total
    }
};

module.exports = GET_GLOBAL_DATA