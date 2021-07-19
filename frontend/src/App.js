import React from 'react';
// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Context
import { GlobalProvider } from './Context';
// Components
import Navbar from './components/Navbar';
import Form from './components/Form';
import Cards from './components/Cards';
import Charts from './components/Charts';
import GlobalTitle from './components/GlobalTitle';
import GlobalCharts from './components/GlobalCharts';
// Styles
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em 1em',
        background: 'linear-gradient(to right, #aaa, #ddd 50%, #aaa)'
    }
}));

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
})

function App() {
    const classes = useStyles()
    return (
        <ApolloProvider client={client}>
            <GlobalProvider>
                <Navbar />
                <div className={classes.root}>
                    <Form />
                    <Cards />
                    <Charts />
                    <GlobalTitle />
                    <GlobalCharts />
                </div>
            </GlobalProvider>
        </ApolloProvider>
    );
}

export default App;