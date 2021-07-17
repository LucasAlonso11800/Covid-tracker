const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const GET_GLOBAL_DATA = require('./Queries/GlobalData');
const GET_COUNTRIES = require('./Queries/Countries');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        globalData: GET_GLOBAL_DATA,
        countries: GET_COUNTRIES
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});