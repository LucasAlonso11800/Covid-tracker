const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const GlobalDataType = new GraphQLObjectType({
    name: 'GlobalData',
    fields: () => ({
        today_confirmed: { type: GraphQLInt },
        today_recovered: { type: GraphQLInt },
        today_open_cases: { type: GraphQLInt },
        today_deaths: { type: GraphQLInt }
    })
});

const CountryDailyInfoType = new GraphQLObjectType({
    name: 'CountryDailyInfo',
    fields: () => ({
        new_confirmed: { type: new GraphQLList(GraphQLInt) },
        new_recovered: { type: new GraphQLList(GraphQLInt) },
        new_deaths: { type: new GraphQLList(GraphQLInt) }
    })
});

const CountryTotalsType = new GraphQLObjectType({
    name: 'CountryTotals',
    fields: () => ({
        total_confirmed: { type: new GraphQLList(GraphQLInt) },
        total_recovered: { type: new GraphQLList(GraphQLInt) },
        total_open_cases: { type: new GraphQLList(GraphQLInt) },
        total_deaths: { type: new GraphQLList(GraphQLInt) },
    })
});

const CountryDailyIncreaseType = new GraphQLObjectType({
    name: 'CountryDailyIncrease',
    fields: () => ({
        confirmed_increase: { type: GraphQLFloat },
        recovered_increase: { type: GraphQLFloat },
        open_cases_increase: { type: GraphQLFloat },
        deaths_increase: { type: GraphQLFloat },
    })
});

module.exports = { GlobalDataType, CountryDailyInfoType, CountryTotalsType, CountryDailyIncreaseType };