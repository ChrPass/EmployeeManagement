import { createContext, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export const SnackBarContext = createContext({});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const defaultSeverity = "success";

export default function SnackBarComponent(props) {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [selectedState, setSelectedState] = useState(defaultSeverity);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message, state = defaultSeverity, duration = 6000) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    setSelectedState(state);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackBarContext.Provider value={handleClick}>
      <div>
        {props.children}
        <Snackbar

          key={messageInfo ? messageInfo.key : undefined}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          onExited={handleExited}
          message={messageInfo ? messageInfo.message : undefined}
        >
          <Alert onClose={handleClose} severity={selectedState ? selectedState : defaultSeverity}>
            {messageInfo ? messageInfo.message : ""}
        </Alert>
        </Snackbar>
      </div>
    </SnackBarContext.Provider>
  );
}
