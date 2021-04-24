import './App.css';

import Navbar from './components/Navbar';
import GlobalDashboard from './components/GlobalDashboard';

function App() {
    return (
        <div className="background">
            <Navbar />
            <GlobalDashboard />
        </div>
    );
}

export default App;