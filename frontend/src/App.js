import React from 'react';
import env from './Environment';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./Home";
import {Room} from "./Game/Room";
import {AppContainer} from "./Components";
import {Socket} from "react-socket-io";

const options = { transports: ['websocket'] };



function App() {
  return (
    <Socket uri={env.BACKEND_URL} options={options}>
      <Router>
        <AppContainer>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/room/:roomId"><Room /></Route>
          </Switch>
        </AppContainer>
      </Router>
    </Socket>
  );
}

export default App;
