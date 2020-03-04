import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from './Home';
import { Game } from './Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/room/:roomId"><Game/></Route>
      </Switch>
    </Router>
  );
}

export default App;
