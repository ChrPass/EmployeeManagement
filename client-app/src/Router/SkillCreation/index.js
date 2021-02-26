import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import skillValidation from "../../utils/validateNewSkill";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBarComp from "./Toolbar";
import {SnackBarContext} from "../../hoc/SnackBarProvider";

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

const SkillCreation = () => {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  let history = useHistory();
  const classes = useStyles();
  const snackbar = useContext(SnackBarContext);

  const createNewSkill = () => {
    var res = skillValidation(details);

    if (res.errors) {
      setErrors({ ...res.errors });
      return;
    }

    const param = { name: details.name, description: details.description };

    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_PATH}skills`,

      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        name: details.name,
        description: details.description,
      },
      transformRequest: [
        function () {
          return JSON.stringify(param);
        },
      ],
    })
      .then((res) => {
        if (!res.data) return;
        snackbar("Successful Transaction");
        history.push(`/Skills`);
      })
      .catch(() => {
        snackbar("Something went wrong. Please try again.", "error");
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
          <AppBarComp createNewSkill={createNewSkill} />
          <form noValidate>
            <Grid container spacing={2} className={classes.grid}>
              <Grid item xs={12}>
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
                  value={details.name}
                  multiline
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="descript"
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                  onChange={handleFieldChange}
                  value={details.description}
                  multiline
                  error={Boolean(errors.description)}
                  helperText={errors.description ? errors.description : ""}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SkillCreation;
