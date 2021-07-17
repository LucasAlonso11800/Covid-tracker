const {
    GraphQLObjectType,
    GraphQLList,
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

const CountryDailyInfoType = new GraphQLObjectType({
    name: 'CountryDailyInfo',
    fields: () => ({
        today_new_confirmed: { type: new GraphQLList(GraphQLInt) },
        today_new_deaths: { type: new GraphQLList(GraphQLInt) },
        today_new_recovered: { type: new GraphQLList(GraphQLInt) },
    })
});

module.exports = { GlobalDataType, CountryDailyInfoType };