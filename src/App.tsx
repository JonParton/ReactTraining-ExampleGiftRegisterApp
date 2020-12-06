import { Box, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SideNav from "./components/SideNav/SideNav";
import Gifts from "./components/Gifts";
import { Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  mainContent: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
    display: "flex",
    width: "100%",
  },
  mainPaper: {
    padding: 24,
  },
  addEditArea: {
    marginTop: theme.spacing(2),
  },
  mainContentContainer: {
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Box>
      <CssBaseline />
      <Box className={classes.root}>
        <Box>
          <NavBar />
        </Box>
        <Box className={classes.mainContent}>
          <Grid container direction="row">
            {/* The left gutter */}
            <Grid item md={false} lg={2} className="Gutter">
              <SideNav />
            </Grid>

            {/* The main content */}
            <Grid className={classes.mainContentContainer} item md={12} lg={8}>
              <Switch>
                <Route exact path="/" component={Home} />
                {/* NOTE: When you have multiple routes, they need to be in your 
                order of preference... For example the other way round will keep
                returning :giftIDParam as undefined regardless. */}
                <Route
                  path={["/gift-register/:giftIDParam", "/gift-register"]}
                  component={Gifts}
                />
              </Switch>
            </Grid>
            {/* The right gutter */}
            <Grid item md={false} lg={2} className="Gutter"></Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
