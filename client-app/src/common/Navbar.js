import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLocation, NavLink, Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import BrushIcon from "@material-ui/icons/Brush";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#ececf1",
    color: "#000000"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    
  },
  drawerOpen: {
    background: "#333547",

    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#333547",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // background: "blue"
  },
  drawerItem: {
    textDecoration: "none",
    color: "#b4c9de",
  },
}));

const pagesPaths = {
  "/": "Home",
  "/Home": "Home",
  "/Employees": "Employees",
  "/Skills": "Skills",
  "/NotFound": "Page Not Found",
};

export default function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pagesPaths[location.pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className={classes.drawerItem}/>
            ) : (
              <ChevronLeftIcon className={classes.drawerItem}/>
            )}
          </IconButton>
        </div>
        <Divider />
        <Link to="/Home" className={classes.drawerItem}>
          <List>
            <ListItem button key={"home"}>
              <ListItemIcon>
                <HomeIcon className={classes.drawerItem}/>
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </List>
        </Link>
        <Link to="/Employees" className={classes.drawerItem}>
          <List>
            <ListItem button key={"empoyees"}>
              <ListItemIcon>
                <PeopleAltIcon className={classes.drawerItem}/>
              </ListItemIcon>
              <ListItemText primary={"Employees"} />
            </ListItem>
          </List>
        </Link>
        <Link to="/Skills" className={classes.drawerItem}>
          <List>
            <ListItem button key={"skills"}>
              <ListItemIcon className={classes.drawerItem}>
                <BrushIcon />
              </ListItemIcon>
              <ListItemText primary={"Skills"} />
            </ListItem>
          </List>
        </Link>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box>{props.children}</Box>
      </main>
    </div>
  );
}
