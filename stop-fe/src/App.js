import React from 'react';
import env from './Environment';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import {Home} from "./Home";
import {Game} from "./Game";
import {AppContainer} from "./Components";

const options = { transports: ['websocket'] };

function App() {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/room/:roomid"><Game/></Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
