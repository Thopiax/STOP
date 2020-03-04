import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

function RoomSetup() {
  return (<div></div>);
}

function RoomJoin() {
  return (<div></div>);
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RoomCreate />
        </Route>
        <Route exact path="/<room_id>">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
