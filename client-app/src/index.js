import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router/index";
import reportWebVitals from "./reportWebVitals";
import SnackBarProvider from "./hoc/SnackBarProvider";

ReactDOM.render(
  <React.StrictMode>
    <SnackBarProvider>
      <Router />
    </SnackBarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
