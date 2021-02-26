import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Ooops!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {
            "The page that you searched does not exist."
          }
        </Typography>
      </Container>
    </div>
  );
};

export default NotFound;