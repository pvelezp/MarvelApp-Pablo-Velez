import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

import MainPage from './components/mainPage/MainPage';
import CharacterDetails from './components/characters/CharacterDetails';
import Characters from './components/characters/Characters';
import ComicDetails from './components/comics/ComicDetails';
import Comics from './components/comics/Comics';
import Favorites from './components/favorites/Favorites';
import NavBar from './components/ui/NavBar';
import Stories from './components/stories/Stories';

function App() {
  return (
    <Router>
      <div className="App__container">
      <NavBar />
      <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/character/:characterId' component={CharacterDetails} />
      <Route path='/characters' component={Characters} />
      <Route  path='/comic/:comicId' component={ComicDetails} />
      <Route  path='/comics' component={Comics} />
      <Route  path='/stories' component={Stories} />
     <Route path='/favorites' component={Favorites} /> 
      </Switch>
      </div>
    </Router>
  );
}

export default App;
