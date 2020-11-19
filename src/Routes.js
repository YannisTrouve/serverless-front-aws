import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from './containers/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
         <NotFound />
      </Route>
      <Route exact path="/home">
         <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
}