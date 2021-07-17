const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');
const GET_GLOBAL_DATA= require('./Queries/GlobalData');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        globalData: GET_GLOBAL_DATA
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});