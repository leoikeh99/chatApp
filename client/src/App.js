import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.css";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
