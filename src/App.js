import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import ReceitaMeal from './components/ReceitaMeal';
import ReceitaMealInProgress from './components/ReceitaMealInProgress';
import ReceitaDrink from './components/ReceitaDrink';
import ReceitaDrinkInProgress from './components/ReceitaDrinkInProgress';

function App() {
  return (
    <div className="meals">
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:id" component={ ReceitaMeal } />
        <Route exact path="/drinks/:id" component={ ReceitaDrink } />
        <Route exact path="/meals/:id/in-progress" component={ ReceitaMealInProgress } />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ ReceitaDrinkInProgress }
        />
      </Switch>
    </div>
  );
}

export default App;
