import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ForgotPassword from "./components/authentication/ForgotPassword";
import LogIn from "./components/authentication/LogIn";
import SignUp from "./components/authentication/SignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <h1 className={classes.appHeader}>Mail Box Client</h1>
      <Redirect to={"/login"} />
      <Switch>
        <Route path={"/login"} exact>
          <LogIn />
        </Route>
        <Route path={"/signup"} exact>
          <SignUp />
        </Route>
        <Route path={"/forgotpassword"} exact>
          <ForgotPassword/>
        </Route>
        <Route path={'/welcome'} exact>
          <WelcomePage/>
        </Route>
        <Route path={"*"}>
          <Redirect to={"/login"} />
        </Route>
      </Switch>
    </div> 
  );
}

export default App;
