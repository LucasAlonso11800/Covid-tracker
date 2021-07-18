import './App.css';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Navbar />
            <Dashboard />
        </ApolloProvider>
    );
}

export default App;