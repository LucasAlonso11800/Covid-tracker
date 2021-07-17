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
        new_confirmed: { type: new GraphQLList(GraphQLInt) },
        new_deaths: { type: new GraphQLList(GraphQLInt) },
        new_recovered: { type: new GraphQLList(GraphQLInt) },
    })
});

const CountryTotalsType = new GraphQLObjectType({
    name: 'CountryTotals',
    fields: () => ({
        total_confirmed: { type: new GraphQLList(GraphQLInt) },
        total_deaths: { type: new GraphQLList(GraphQLInt) },
        total_recovered: { type: new GraphQLList(GraphQLInt) },
        total_open_cases: { type: new GraphQLList(GraphQLInt) },
    })
});

module.exports = { GlobalDataType, CountryDailyInfoType, CountryTotalsType };