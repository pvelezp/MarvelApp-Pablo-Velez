import React from 'react'

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


import MainPage from './../components/mainPage/MainPage';
import CharacterDetails from './../components/characters/CharacterDetails';
import Characters from './../components/characters/Characters';
import ComicDetails from './../components/comics/ComicDetails';
import Comics from './../components/comics/Comics';
import Stories from './../components/stories/Stories';
import Favorites from './../components/favorites/Favorites';
import NavBar from './../components/ui/NavBar';
import { useContext } from 'react';
import { AuthContext } from './../auth/authContext';
import PrivateRoute from './PrivateRoute';

const MarvelRoutes = () => {

  const {user} = useContext(AuthContext)

    return (
        <>
          <NavBar />

          <div>
            <Switch>
       <Route exact path='/' component={MainPage} />
      <Route path='/character/:characterId' component={CharacterDetails} />
      <Route path='/characters' component={Characters} />
      <Route  path='/comic/:comicId' component={ComicDetails} />
   <Route  path='/comics' component={Comics} />
      <Route  path='/stories' component={Stories} />
      <PrivateRoute
      isAuthenticated={user.user}
      path='/favorites' component={Favorites} /> 

      <Redirect to='/' />
       </Switch>
          </div>  
        </>
    )
}

export default MarvelRoutes
