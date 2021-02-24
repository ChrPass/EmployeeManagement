import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AppBarComp from "./AppBar";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    background: "#564AB1",
    color: "#ffffff",
    "&:hover": {
      color: "#000000",
    },
  },
});

export default function SkillsTable() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  let history = useHistory();

  const getEmployees = async () => {
    await Axios({
      method: "get",
      url: process.env.REACT_APP_API_PATH + "Employee",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleDetailsRedirection = (e, id) => {
    history.push(`/Employees/${id}`);
  };

  return (
    <div>
      <AppBarComp />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="left">Job Title</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="left">{row.jobTitle}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={(e) => handleDetailsRedirection(e, row.id)}
                    className={classes.button}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
