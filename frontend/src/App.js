import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GlobalProvider } from './Context';
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
})

function App() {
    return (
        <ApolloProvider client={client}>
            <GlobalProvider>
                <Navbar />
                <Dashboard />
            </GlobalProvider>
        </ApolloProvider>
    );
}

export default App;