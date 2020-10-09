import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginScreen from './../components/login/LoginScreen';
import MarvelRoutes from './MarvelRoutes';
import PublicRoute from './PublicRoute';
import { useContext } from 'react';
import { AuthContext } from './../auth/authContext';

const AppRouter = () => {
    const {user} = useContext(AuthContext)

    return (
        <Router>
            <div>
     

                <Switch>
                    <PublicRoute
                    isAuthenticated={user.logged}
                    exact path='/login' component={LoginScreen} />

                    <Route  path='/' component={MarvelRoutes} />
                </Switch>
            </div>
            
        </Router>
    )
}

export default AppRouter
