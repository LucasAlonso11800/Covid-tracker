import React, { createContext, useState } from 'react';
import { dateToString } from './functions';

export const GlobalContext = createContext();

const localDate = new Date().setMinutes(new Date().getUTCMinutes() - new Date().getTimezoneOffset())
const today = new Date(localDate)

const to = new Date(today.valueOf());
to.setDate(today.getDate() - 1);

const from = new Date(today.valueOf());
from.setDate(today.getDate() - 1);
from.setMonth(today.getMonth() - 1);

export const GlobalProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        country: 'Argentina',
        from_date: dateToString(from),
        to_date: dateToString(to),
        today: dateToString(today)
    });

    return (
        <GlobalContext.Provider value={[filters, setFilters]}>
            {children}
        </GlobalContext.Provider>
    )
};