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

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {
            "This is a test project about an employee management app, using .NET Core and React."
          }
          <br />
          {"You can create, update and delete Skills or Employees."}
        </Typography>
        <Typography variant="body1">Pasiopoulos Christos 2021</Typography>
      </Container>
    </div>
  );
};

export default Home;
