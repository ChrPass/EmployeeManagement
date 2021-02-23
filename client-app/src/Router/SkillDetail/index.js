import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
  const classes = useStyles();

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
        setDetails(res.data);
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
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
          alert("Ok");
        })
        .catch((err) => {
          alert("Something went wrong. Please try again.");
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
          alert("Ok");
        })
        .catch((err) => {
          alert("Something went wrong. Please try again.");
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
                  value={details.description}
                  multiline
                />
              </Grid>
            </Grid>
            <Box display="flex" width={1}>
                <Box width="100%"> 
            <Button
            type="submit"
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
            type="submit"
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
