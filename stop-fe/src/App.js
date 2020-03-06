import React from 'react';
import env from './Environment';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Socket } from 'react-socket-io';
import {Home} from "./Home";
import {Room} from "./Room";

const options = { transports: ['websocket'] };



function App() {
  return (
      <Socket uri={env.BACKEND_URL} options={options}>
        <Router>
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/room/:roomid"><Room/></Route>
          </Switch>
        </Router>
      </Socket>
  );
}

export default App;
