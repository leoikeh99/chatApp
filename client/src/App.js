import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import NavState from "./context/nav/NavState";
import UsersState from "./context/users/UsersState";
import setAuthToken from "./functions/setAuthToken";
import PrivateRoutes from "./components/routing/PrivateRoutes";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <NavState>
        <UsersState>
          <Router>
            <NavBar />
            <Switch>
              <PrivateRoutes exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </UsersState>
      </NavState>
    </AuthState>
  );
}

export default App;
