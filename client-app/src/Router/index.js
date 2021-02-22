import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Skills from "./Skills/index";
import Employees from "./Empoyees/index";
import NotFound from "./NotFound/index";
import Navbar from "../common/Navbar";

const Router = () => {
  return (
    <BrowserRouter>
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/Employees" component={Employees} />
            <Route path="/Skills" component={Skills} />
            <Route path="/NotFound" component={NotFound} />
          </Switch>
        </Navbar>
    </BrowserRouter>
  );
};

export default Router;
