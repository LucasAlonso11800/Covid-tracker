import { gql } from '@apollo/client';

export const GET_COUNTRY_DAILY_INCREASE = gql`
    query countryDailyIncrease(
        $country: String!
        $from_date: String!
        $to_date: String!
        )   {
                countryDailyIncrease(
                    country: $country,
                    from_date: $from_date,
                    to_date: $to_date
            ){
                confirmed_increase,
                recovered_increase,
                open_cases_increase,
                deaths_increase
            }
        }
`;

export const GET_DATES = gql`
    query dates(
        $country: String!
        $from_date: String!
        $to_date: String!
    )   {
        dates(
            country: $country,
            from_date: $from_date,
            to_date: $to_date
        )
    }
`

export const GET_COUNTRIES = gql`
    query countries(
        $date: String!
    )   {
        countries(
            date: $date,
        )
    }
`

export const GET_GLOBAL_DATA = gql`
    query globalData(
        $date: String!
    )   {
        globalData(
            date: $date,
        ){
            today_confirmed
            today_recovered
            today_open_cases
            today_deaths
        }
    }
`

export const GET_COUNTRY_TOTALS = gql`
    query countryTotals(
        $country: String!
        $from_date: String!
        $to_date: String!
    )   {
        countryTotals(
            country: $country,
            from_date: $from_date,
            to_date: $to_date
        ){
            total_confirmed
            total_recovered
            total_open_cases
            total_deaths
        }
    }
`
