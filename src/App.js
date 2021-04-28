import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import LocalDashboard from './pages/LocalDashboard'
import GlobalDashboard from './pages/GlobalDashboard';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em'
    }
}));

function App() {
    const classes = useStyles()
    return (
        <>
            <Router>
                <Navbar />
                <div className={classes.root}>
                    <Route path='/' exact component={GlobalDashboard} />
                    <Route path='/local' component={LocalDashboard} />
                </div>
            </Router>
        </>
    );
}

export default App;