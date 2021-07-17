const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const GET_GLOBAL_DATA = require('./Queries/GlobalData');
const GET_COUNTRIES = require('./Queries/Countries');
const GET_COUNTRY_DAILY_INFO = require('./Queries/CountryDailyInfo');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        globalData: GET_GLOBAL_DATA,
        countries: GET_COUNTRIES,
        dailyCountryInfo: GET_COUNTRY_DAILY_INFO
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});