import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import AppBarComp from "./AppBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
  const [skillList, setSkillList] = useState([]);
  let history = useHistory();
  const getSkills = async () => {
    await Axios({
      method: "get",
      url: process.env.REACT_APP_API_PATH + "Skills",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setSkillList(res.data);
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleDetailsRedirection = (e, id) => {
    history.push(`/Skills/${id}`);
  };

  return (
    <div>
      <AppBarComp />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {skillList.map((row) => (
                <TableRow key={row.name} hover>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
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
