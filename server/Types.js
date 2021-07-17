const {
    GraphQLObjectType,
    // GraphQLString,
    GraphQLInt
} = require('graphql');

const GlobalDataType = new GraphQLObjectType({
    name: 'GlobalData',
    fields: () => ({
        today_confirmed: { type: GraphQLInt },
        today_deaths: { type: GraphQLInt },
        today_open_cases: { type: GraphQLInt },
        today_recovered: { type: GraphQLInt },
    })
});

module.exports = { GlobalDataType };