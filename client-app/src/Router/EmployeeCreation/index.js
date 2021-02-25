import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBarComp from "./Toolbar";
import MultSelectionComp from "../../common/SkillsSelector";
import SexSelector from "../../common/SexSelector";
import employeeValidation from "../../utils/validateNewEmployee";

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


const EmployeeCreation = () => {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  let history = useHistory();
  const classes = useStyles();

  const createNewEmployee = () => {
    var res = employeeValidation(details);
    if (res.errors) {
      setErrors({ ...res.errors });
      return;
    }

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_PATH}Employee`,

      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: details,
      transformRequest: [
        function () {
          return JSON.stringify(details);
        },
      ],
    })
      .then((res) => {
        if (!res.data) return;
        alert("Ok");
        history.push(`/Employees`);
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  };

  const handleFieldChange = (e) => {
    setDetails((detail) => ({ ...detail, [e.target.name]: e.target.value }));
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
          <AppBarComp createNewEmployee={createNewEmployee} />
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
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name : ""}
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
                  error={Boolean(errors.surname)}
                  helperText={errors.surname ? errors.surname : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <SexSelector selected={details.sex} setSelected={setDetails}/>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Birthday"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={details.dateOfBirth ? details.dateOfBirth : ""}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth ? errors.dateOfBirth : ""}
                  onChange={handleFieldChange}
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
                  error={Boolean(errors.jobTitle)}
                  helperText={errors.jobTitle ? errors.jobTitle : ""}
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
                  error={Boolean(errors.jobDescription)}
                  helperText={errors.jobDescription ? errors.jobDescription : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <MultSelectionComp
                  setSelectedData={setDetails}
                  selectedData={details.skills}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeCreation;
