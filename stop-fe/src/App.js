import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/room/:id"><Game/></Route>
      </Switch>
    </Router>
  );
}

export default App;
