import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  Link as MUILink,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useSetRecoilState } from "recoil";
import { mobileMenuOpenState } from "./SideNav/SideNavAtom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "none",
  },
  tooltip: {
    fontSize: theme.typography.fontSize * 1.2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const NavBar: React.FunctionComponent = () => {
  const classes = useStyles();
  const setMobileMenuOpen = useSetRecoilState(mobileMenuOpenState);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setMobileMenuOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            Example Gift Register
          </Typography>
          <Tooltip
            title="See the code on GitHub"
            aria-label="See the code on GitHub"
            classes={{ tooltip: classes.tooltip }}
          >
            <MUILink
              href="https://github.com/JonParton/ReactTraining-ExampleGiftRegisterApp"
              color="inherit"
            >
              <Button
                component="span"
                startIcon={<GitHubIcon />}
                color="inherit"
              >
                <Box display={{ xs: "none", sm: "block" }}>
                  <Typography variant="h6" className={classes.title}>
                    See the code on GitHub
                  </Typography>
                </Box>
              </Button>
            </MUILink>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
