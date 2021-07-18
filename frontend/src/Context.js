import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        country: 'Argentina',
        from_date: '2021-06-17',
        to_date: '2021-07-17'        
    });

    return (
        <GlobalContext.Provider value={[filters, setFilters]}>
            {children}
        </GlobalContext.Provider>
    )
};