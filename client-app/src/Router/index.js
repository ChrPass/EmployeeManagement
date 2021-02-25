import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Skills from "./Skills/index";
import SkillDetail from "./SkillDetail/index";
import Employees from "./Empoyees/index";
import NotFound from "./NotFound/index";
import Navbar from "../common/Navbar";
import SkillCreation from "./SkillCreation/index";
import EmployeeCreation from "./EmployeeCreation/index";
import EmployeeDetails from "./EmployeeDetails/index";

const Router = () => {
  return (
    <BrowserRouter>
        <Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            <Route exact path="/Employees" component={Employees} />
            <Route path="/Employees/:employeeId" component={EmployeeDetails} />
            <Route path="/EmployeeCreation" component={EmployeeCreation} />
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
