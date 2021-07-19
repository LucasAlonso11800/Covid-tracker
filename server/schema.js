const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const GET_GLOBAL_DATA = require('./Queries/GlobalData');
const GET_COUNTRIES = require('./Queries/Countries');
const GET_COUNTRY_DAILY_INFO = require('./Queries/CountryDailyInfo');
const GET_COUNTRY_TOTALS = require('./Queries/CountryTotals');
const GET_COUNTRY_DAILY_INCREASE = require('./Queries/IncreaseData');
const GET_DATES = require('./Queries/Dates');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        globalData: GET_GLOBAL_DATA,
        countries: GET_COUNTRIES,
        countryDailyInfo: GET_COUNTRY_DAILY_INFO,
        countryTotals: GET_COUNTRY_TOTALS,
        countryDailyIncrease: GET_COUNTRY_DAILY_INCREASE,
        dates: GET_DATES
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});