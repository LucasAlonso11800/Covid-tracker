import './App.css';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em 1em',
        background: 'linear-gradient(to right, #aaa, #ddd 50%, #aaa)'
    }
}));

function App() {
    const classes = useStyles()
    return (
        <>
            <Navbar />
            <div className={classes.root}>
                <Dashboard/>
            </div>
        </>
    );
}

export default App;