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
      <div className="App">
        <header className="App-header">
          <h1>STOP</h1>
          <div>
            <Link to="/create" class="button"><button>Create Room</button></Link>
            <Link to="/join" class="button"><button>Join Room</button></Link>
          </div>
        </header>
      </div>

      <Switch>
        <Route exact path="/create">
          <RoomSetup />
        </Route>
        <Route exact path="/join">
          <RoomJoin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
