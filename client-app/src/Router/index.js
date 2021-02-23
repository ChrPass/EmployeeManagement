import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Skills from "./Skills/index";
import SkillDetail from "./SkillDetail/index";
import Employees from "./Empoyees/index";
import NotFound from "./NotFound/index";
import Navbar from "../common/Navbar";
import SkillCreation from "./SkillCreation/index";

const Router = () => {
  return (
    <BrowserRouter>
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/Employees" component={Employees} />
            <Route exact path="/Skills" component={Skills} />
            <Route path="/Skills/:skillId" component={SkillDetail} />
            <Route path="/SkillCreation" component={SkillCreation} />
            <Route path="/NotFound" component={NotFound} />
          </Switch>
        </Navbar>
    </BrowserRouter>
  );
};

export default Router;
