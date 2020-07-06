import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './components/NavBar';
import Loader from './components/Loader';

import { useRoutes } from './routes.js'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';


function App() {
    const { login, logout, token, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <NavBar />}
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
