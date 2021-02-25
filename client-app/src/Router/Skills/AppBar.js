import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#ececf1 !important",
    color: "#000000 !important"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
}));

export default function AppBarComp() {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box className={classes.rightToolbar}>
            <Button color="inherit" onClick={() => history.push(`/SkillCreation`)}>Create Skill</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
