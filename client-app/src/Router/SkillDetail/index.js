import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";  
import moment from "moment";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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

const SkillDetail = (props) => {
  const { match, location } = props;
  const [details, setDetails] = useState({});
  const skillId = match.params.skillId;
  let history = useHistory();
  const classes = useStyles();
  const snackbar = useContext(SnackBarContext);

  const getSkillDetails = () => {
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_API_PATH}Skills/${skillId}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.data) return;
        console.log(res.data)
        setDetails(res.data);
      })
      .catch((err) => {
        snackbar("Something went wrong. Please try again.", "error");
      });
  };

  useEffect(() => {
    getSkillDetails();
  }, []);

  const handleFieldChange = (e) => {
    setDetails(detail => ({...detail, [e.target.name]: e.target.value }))
  }

  const handleUpdate = (e) => {
    Axios({
        method: "put",
        url: `${process.env.REACT_APP_API_PATH}Skills/${skillId}`,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        data: {
            name: details.name,
            description: details.description,
        }
      })
        .then((res) => {
          snackbar("Successful Transaction");
        })
        .catch((err) => {
          snackbar("Something went wrong. Please try again.", "error");
        });
  } 

  const handleDelete = (e) => {
    Axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_PATH}Skills/${skillId}`,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          snackbar("Successful Transaction");
          history.push(`/Skills`);
        })
        .catch((err) => {
          snackbar("Something went wrong. Please try again.", "error");
        });
  } 

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
            {details.name}
          </Typography>
          <form noValidate>
            <Grid container spacing={2} className={classes.grid}>
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
                  value={details.description ? details.description : ""}
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  id="updateDate"
                  name="updateDate"
                  label="Last Update Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={details.updateDate ? moment(details.updateDate).format("YYYY-MM-DD") : ""}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
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

export default SkillDetail;
