import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from '../components/Form';
import Cards from '../components/Cards';
import Charts from '../components/Charts';
import GlobalTitle from '../components/GlobalTitle';
import GlobalCharts from '../components/GlobalCharts';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em 1em',
        background: 'linear-gradient(to right, #aaa, #ddd 50%, #aaa)'
    }
}));

function Dashboard() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Form />
            <Cards />
            <Charts/>
            <GlobalTitle />
            <GlobalCharts />
        </div>
    )
};

export default Dashboard;