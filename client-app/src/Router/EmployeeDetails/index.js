import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SkillsSelector from "../../common/SkillsSelector";

const useStyles = makeStyles((theme) => ({
  boxStyle: {
    width: "100vh",
    background: "#ffffff",
  },
  grid: {
    marginTop: 50,
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    width: "50",
  },
}));

const EmployeeDetails = (props) => {
  const { match, location } = props;
  const [details, setDetails] = useState({});
  const employeeId = match.params.employeeId;
  let history = useHistory();
  const classes = useStyles();

  const getEmployee = () => {
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_API_PATH}Employee/${employeeId}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.data) return;
        setDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const handleFieldChange = (e) => {
    setDetails((detail) => ({ ...detail, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    Axios({
      method: "put",
      url: `${process.env.REACT_APP_API_PATH}Employee/${employeeId}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      data: details,
    })
      .then((res) => {
        alert("Ok");
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_PATH}Employee/${employeeId}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        alert("Ok");
        history.push(`/Employees`);
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <Container>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.boxStyle}
      >
        <Box style={{ width: "100%" }}>
          <Typography component="h1" variant="h3">
            {details.fullName ?? ""}
          </Typography>
          <form noValidate>
            <Grid container spacing={2} className={classes.grid}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.name ?? ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="surname"
                  name="surname"
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Surname"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.surname ?? ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="sex"
                  name="sex"
                  variant="outlined"
                  required
                  fullWidth
                  id="sex"
                  label="Sex"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.sex ?? ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="age"
                  name="age"
                  variant="outlined"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.age ?? ""}
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="jobTitle"
                  name="jobTitle"
                  variant="outlined"
                  required
                  fullWidth
                  id="jobTitle"
                  label="Job Title"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.jobTitle ?? ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="jobDescription"
                  name="jobDescription"
                  variant="outlined"
                  required
                  fullWidth
                  id="jobDescription"
                  label="Job Description"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.jobDescription ?? ""}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <SkillsSelector
                  selectedData={details.skills}
                  setSelectedData={setDetails}
                />
              </Grid>
            </Grid>
            <Box display="flex" width={1}>
              <Box width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Box>
              <Box flexShrink={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeDetails;
