import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  title: {
    marginRight: theme.spacing(2),
  },
}));

export default function AppBarComp(props) {
  const { createNewSkill } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
            Create New Skill
          </Typography>
          <Button color="inherit" className={classes.rightToolbar} onClick={createNewSkill}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
